import React, {
	useState,
	useEffect,
	useLayoutEffect,
	useRef,
	//import react types
	MutableRefObject,
	Dispatch,
	SetStateAction,
	ChangeEvent,
} from 'react';

import {
	BsArrowUpCircle,
	BsArrowDownCircle,
	BsCloudMinusFill,
	BsColumnsGap,
} from 'react-icons/bs';
import {
	AiOutlinePlayCircle,
	AiOutlinePauseCircle,
	AiFillAccountBook,
} from 'react-icons/ai';
import { FiRefreshCcw } from 'react-icons/fi';

import './styles.css';

//color array
const colorArray = [
	'#fb918f',
	'#ee749d',
	'#a3b0e4',
	'#947ac0',
	'#5c6bc0',
	'#6ebbfa',
	'#26c6da',
	'#9ccc65',
	'#d3b21d',
	'#ffb74d',
];

interface EquationPropType {
	minEquationDigit: number;
	maxEquationDigit: number;
	adding: boolean;
	subtracting: boolean;
}
type setEquationPropsType = Dispatch<SetStateAction<EquationPropType>>;

type equationControlSettingsType = {
	equiationPropsObj: EquationPropType;
	setEquiationPropsObj: setEquationPropsType;
	currAction: string;
	startStopState: string;
	setTimerMinutes: Dispatch<SetStateAction<number>>;
	setTimerSeconds: Dispatch<SetStateAction<number>>;
};

//control component
const EquiationControl = (props: equationControlSettingsType): JSX.Element => {
	const {
		equiationPropsObj,
		setEquiationPropsObj,
		currAction,
		startStopState,
		setTimerMinutes,
		setTimerSeconds,
	} = props;

	const [minDigitInputWidth, setMinDigitInputWidth] = useState('35px');
	const [maxDigitInputWidth, setMaxDigitInputWidth] = useState('35px');

	//input width handling depending on the length of the input value
	type inputHandlerType = (valueLength: number) => string;
	const inputWidthHandler: inputHandlerType = (valueLength) => {
		const newNumberInputWidth =
			40 + (valueLength === 1 ? 0 : 9.67 * valueLength);
		// console.log(newNumberInputWidth.toString()+'px')
		return newNumberInputWidth.toString() + 'px';
	};
	const increaseMinDigit: () => void = () => {
		if (startStopState === 'stop') {
			setEquiationPropsObj((prevState: EquationPropType) => ({
				...prevState,
				minEquationDigit: prevState.minEquationDigit + 1,
			}));
		}
	};
	const decreaseMinDigit: () => void = () => {
		if (startStopState === 'stop') {
			setEquiationPropsObj((prevState: EquationPropType) => ({
				...prevState,
				minEquationDigit: prevState.minEquationDigit - 1,
			}));
		}
	};
	const increaseMaxDigit: () => void = () => {
		if (startStopState === 'stop') {
			if (startStopState === 'stop') {
				setEquiationPropsObj((prevState: EquationPropType) => ({
					...prevState,
					maxEquationDigit: prevState.maxEquationDigit + 1,
				}));
			}
		}
	};
	const decreaseMaxDigit: () => void = () => {
		if (startStopState === 'stop') {
			setEquiationPropsObj((prevState: EquationPropType) => ({
				...prevState,
				maxEquationDigit: prevState.maxEquationDigit - 1,
			}));
		}
	};

	const typeMinDigitHandler: (
		event: ChangeEvent<HTMLInputElement>,
	) => void = () => {
		if (startStopState === 'stop') {
			if (event) {
				const target = event.target as HTMLInputElement;
				if (typeof target.value === 'string') {
					setEquiationPropsObj((prevState: EquationPropType) => ({
						//other states in obj stay the same
						...prevState,
						minEquationDigit: isNaN(parseInt(target.value))
							? prevState.minEquationDigit
							: parseInt(target.value),
					}));
				}
			}
		}
		// console.log(event?.target);
	};
	const typeMaxDigitHandler: (
		event: ChangeEvent<HTMLInputElement>,
	) => void = () => {
		if (startStopState === 'stop') {
			if (event) {
				const target = event.target as HTMLInputElement;
				if (typeof target.value === 'string') {
					setEquiationPropsObj((prevState: EquationPropType) => ({
						//other states in obj stay the same
						...prevState,
						maxEquationDigit: isNaN(parseInt(target.value))
							? prevState.maxEquationDigit
							: parseInt(target.value),
					}));
				}
			}
		}
		// console.log(event?.target);
	};
	const toggleAddingState: () => void = () => {
		if (startStopState === 'stop') {
			setEquiationPropsObj((prevState: EquationPropType) => {
				return prevState.adding
					? { ...prevState, adding: false }
					: { ...prevState, adding: true };
			});
		}
	};
	const toggleSubtractingState: () => void = () => {
		if (startStopState === 'stop') {
			setEquiationPropsObj((prevState: EquationPropType) => {
				return prevState.subtracting
					? { ...prevState, subtracting: false }
					: { ...prevState, subtracting: true };
			});
		}
	};
	//balance bad states
	useEffect(() => {
		console.log(equiationPropsObj.adding);
		console.log(equiationPropsObj.subtracting);
		if (!equiationPropsObj.adding && !equiationPropsObj.subtracting) {
			toggleAddingState();
		}
		// console.log(equiationPropsObj.minEquationDigit.toString().length)
		setMinDigitInputWidth(
			inputWidthHandler(equiationPropsObj.minEquationDigit.toString().length),
		);
		setMaxDigitInputWidth(
			inputWidthHandler(equiationPropsObj.maxEquationDigit.toString().length),
		);
	}, [equiationPropsObj]);

	useEffect(() => {
		// console.log(console.log('equiationPropsObj.minEquationDigit changed'))
		if (
			equiationPropsObj.minEquationDigit >= equiationPropsObj.maxEquationDigit
		) {
			setEquiationPropsObj((prevState: EquationPropType) => ({
				//other states in obj stay the same
				...prevState,
				maxEquationDigit: prevState.minEquationDigit + 1,
			}));
		}
	}, [equiationPropsObj.minEquationDigit]);

	useEffect(() => {
		if (
			equiationPropsObj.maxEquationDigit <= equiationPropsObj.minEquationDigit
		) {
			setEquiationPropsObj((prevState: EquationPropType) => ({
				//other states in obj stay the same
				...prevState,
				minEquationDigit: prevState.minEquationDigit - 1,
			}));
		}
	}, [equiationPropsObj.maxEquationDigit]);

	return (
		<div className='d-flex flex-column align-items-center mx-3'>
			<h3 className='text-center'>Выберите опции</h3>
			<div className='d-flex flex-row  mb-3'>
				<div className='d-flex flex-column align-items-center mx-3'>
					<h4>Диапазон чисел:</h4>
					<div className='d-flex flex-row flex-wrap align-items-center  mb-3'>
						<div
							id='from'
							className='d-flex flex-column flex-wrap align-items-center'>
							<h4>От</h4>
							<button
								id='minDigitIncrement'
								className={
									(startStopState === 'stop'
										? 'buttonClickAnimation '
										: 'buttonDisableStyle ') +
									'timerButton hoverAnimationDuration'
								}
								onClick={increaseMinDigit}>
								<BsArrowUpCircle />
							</button>
							<input
								style={{ width: minDigitInputWidth }}
								type='text'
								id='minDigiit'
								className='digitInput h4'
								size={1}
								onChange={(event) => typeMinDigitHandler(event)}
								value={equiationPropsObj.minEquationDigit}
							/>
							<button
								id='minDigitDecrement'
								className={
									(startStopState === 'stop'
										? 'buttonClickAnimation '
										: 'buttonDisableStyle ') +
									'timerButton hoverAnimationDuration'
								}
								onClick={decreaseMinDigit}>
								<BsArrowDownCircle />
							</button>
						</div>
						<div
							id='to'
							className='d-flex flex-column flex-wrap align-items-center'>
							<h4 className='ms-2'>до</h4>
							<button
								id='maxDigitIncrement'
								className={
									(startStopState === 'stop'
										? 'buttonClickAnimation '
										: 'buttonDisableStyle ') +
									'timerButton hoverAnimationDuration'
								}
								onClick={increaseMaxDigit}>
								<BsArrowUpCircle />
							</button>
							<input
								style={{ width: maxDigitInputWidth }}
								type='text'
								id='minDigiit'
								className='digitInput h4'
								size={1}
								onChange={(event) => typeMaxDigitHandler(event)}
								value={equiationPropsObj.maxEquationDigit}
							/>
							<button
								id='minDigitDecrement'
								className={
									(startStopState === 'stop'
										? 'buttonClickAnimation '
										: 'buttonDisableStyle ') +
									'timerButton hoverAnimationDuration'
								}
								onClick={decreaseMaxDigit}>
								<BsArrowDownCircle />
							</button>
						</div>
					</div>
				</div>
				<div>
					<h4>Доступные действия:</h4>
					<div className='d-flex flex-column flex-wrap align-items-center m-2'>
						<label
							className='h4'
							htmlFor='adding'>
							Сложение (+)
						</label>
						<label className='switch ms-2'>
							<input
								type='checkbox'
								id='adding'
								defaultChecked={equiationPropsObj.adding}
								onChange={toggleAddingState}
								disabled={startStopState === 'stop' ? false : true}
							/>
							<span className='slider round'></span>
						</label>
					</div>
					<div className='d-flex flex-column flex-wrap align-items-center m-2'>
						<label
							className='h4'
							htmlFor='adding'>
							Вычитание (-)
						</label>
						<label className='switch ms-2'>
							<input
								type='checkbox'
								id='adding'
								defaultChecked={equiationPropsObj.subtracting}
								onChange={toggleSubtractingState}
								disabled={startStopState === 'stop' ? false : true}
							/>
							<span className='slider round'></span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

let timerInterval: ReturnType<typeof setInterval>;
const App = (): JSX.Element => {
	const [bgColor, setBgColor] = useState<string>('gray');
	const [equationProps, setEquationProps] = useState<EquationPropType>({
		minEquationDigit: 0,
		maxEquationDigit: 10,
		adding: true,
		subtracting: false,
	});
	const [timerMinutes, setTimerMinutes] = useState<number>(25);
	const [timerSeconds, setTimerSeconds] = useState<number>(0);
	const [currAction, setCurrAction] = useState<string>('Session');
	const [startStopState, setStartStopState] = useState<string>('stop');
	const audioHtmlEl = useRef() as MutableRefObject<HTMLAudioElement>;
	const currAudioHtmlEL = audioHtmlEl.current;

	// const toggleCurrAction: (prevState: string) => string = (prevState) => {
	// 	setTimerSeconds(0);
	// 	if (prevState === 'Session') {
	// 		setTimerMinutes(breakLength.length);
	// 		return 'Brake';
	// 	} else {
	// 		setTimerMinutes(sessionLength.length);
	// 		return 'Session';
	// 	}
	// };

	const minutesContdown: (prevState: number) => number = (prevState) => {
		if (prevState - 1 < 0) {
			currAudioHtmlEL.play();
			// setCurrAction((prevState) => toggleCurrAction(prevState));
			return 0;
		} else return prevState - 1;
	};

	const secondContdown: (prevState: number) => number = (prevState) => {
		if (prevState - 1 < 0) {
			setTimerMinutes((prevState) => minutesContdown(prevState));
			return 59;
		} else return prevState - 1;
	};

	const startTimerHandler: () => void = () => {
		timerInterval = setInterval(() => {
			setTimerSeconds((prevState) => secondContdown(prevState));
		}, 1000);
		//timerInterval = setInterval(secondsСountdown(), 1000);
	};
	const stopTimerHandler: () => void = () => {
		clearInterval(timerInterval);
	};

	const toggleTimerHandler: () => void = () => {
		if (startStopState === 'stop') {
			setStartStopState('start');
			startTimerHandler();
		} else {
			setStartStopState('stop');
			stopTimerHandler();
		}
	};

	const refreshHandler: () => void = () => {
		currAudioHtmlEL.pause();
		currAudioHtmlEL.load();
		setStartStopState('stop');
		clearInterval(timerInterval);
		setCurrAction('Session');
		// setSessionLength((prevState: timeControlType) => ({
		// 	id: prevState.id,
		// 	name: prevState.name,
		// 	length: 25,
		// }));
		// setBrakeLength((prevState: timeControlType) => ({
		// 	id: prevState.id,
		// 	name: prevState.name,
		// 	length: 5,
		// }));
		setTimerMinutes(25);
		setTimerSeconds(0);
	};

	useLayoutEffect(() => {
		setBgColor(colorArray[Math.floor(Math.random() * 10)]);
	}, []);
	return (
		<main
			id='container'
			className='vh-100 d-flex justify-content-center align-items-center elementFadeIn'
			style={{
				backgroundColor: bgColor,
				minHeight: '420px',
			}}>
			<div
				id='app'
				className='d-flex flex-column align-items-center appContainer'>
				<h2
					id='firstLineTitle'
					style={{ width: 'max-content' }}>
					Тренажёр арифметики.
				</h2>
				<h2
					id='seconLineTitle'
					style={{ width: 'max-content' }}>
					Первый класс.
				</h2>
				<div
					id='controlBlock'
					className='d-flex'>
					<EquiationControl
						equiationPropsObj={equationProps}
						setEquiationPropsObj={setEquationProps}
						currAction={currAction}
						startStopState={startStopState}
						setTimerMinutes={setTimerMinutes}
						setTimerSeconds={setTimerSeconds}
					/>
				</div>
				<div className='d-flex flex-column align-items-center'>
					<h4
						id='timer-label'
						style={{ width: 'max-content' }}>
						{currAction}
					</h4>
					<h1 id='time-left'>
						{timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}:
						{timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}
					</h1>
				</div>
				<div className='d-flex flex-row'>
					<button
						id='start_stop'
						className='controlButton hoverAnimationDuration'
						onClick={toggleTimerHandler}>
						<AiOutlinePlayCircle />/
						<AiOutlinePauseCircle />
					</button>
					<button
						id='reset'
						className='controlButton hoverAnimationDuration'
						onClick={refreshHandler}>
						<FiRefreshCcw />
					</button>
				</div>
				<audio
					id='beep'
					ref={audioHtmlEl}
					preload='auto'
					src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
				/>
			</div>
		</main>
	);
};

export default App;
