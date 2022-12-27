import React, {
	useState,
	useEffect,
	useLayoutEffect,
	//import react types
	Dispatch,
	SetStateAction,
	ChangeEvent,
} from 'react';

import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
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

interface EquationControlPropInterface {
	minEquationDigit: number;
	maxEquationDigit: number;
	adding: boolean;
	subtracting: boolean;
}
type setEquationPropsType = Dispatch<
	SetStateAction<EquationControlPropInterface>
>;

type equationControlPropsType = {
	equationPropsObj: EquationControlPropInterface;
	setEquationPropsObj: setEquationPropsType;
	startStopState: string;
};

type equationTrainerPropType = Omit<
	equationControlPropsType,
	'setEquationPropsObj'
> & {
	setMistakesQuantity: Dispatch<SetStateAction<number>>;
	setCorrectAnswersQuantity: Dispatch<SetStateAction<number>>;
};

//control component
const EquationControl = (props: equationControlPropsType): JSX.Element => {
	const { equationPropsObj, setEquationPropsObj, startStopState } = props;

	const [minDigitInputWidth, setMinDigitInputWidth] = useState('40px');
	const [maxDigitInputWidth, setMaxDigitInputWidth] = useState('40px');

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
			setEquationPropsObj((prevState: EquationControlPropInterface) => ({
				...prevState,
				minEquationDigit: prevState.minEquationDigit + 1,
			}));
		}
	};
	const decreaseMinDigit: () => void = () => {
		if (startStopState === 'stop') {
			setEquationPropsObj((prevState: EquationControlPropInterface) => ({
				...prevState,
				minEquationDigit: prevState.minEquationDigit - 1,
			}));
		}
	};
	const increaseMaxDigit: () => void = () => {
		if (startStopState === 'stop') {
			if (startStopState === 'stop') {
				setEquationPropsObj((prevState: EquationControlPropInterface) => ({
					...prevState,
					maxEquationDigit: prevState.maxEquationDigit + 1,
				}));
			}
		}
	};
	const decreaseMaxDigit: () => void = () => {
		if (startStopState === 'stop') {
			setEquationPropsObj((prevState: EquationControlPropInterface) => ({
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
					setEquationPropsObj((prevState: EquationControlPropInterface) => ({
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
					setEquationPropsObj((prevState: EquationControlPropInterface) => ({
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
			setEquationPropsObj((prevState: EquationControlPropInterface) => {
				return prevState.adding
					? { ...prevState, adding: false }
					: { ...prevState, adding: true };
			});
		}
	};
	const toggleSubtractingState: () => void = () => {
		if (startStopState === 'stop') {
			setEquationPropsObj((prevState: EquationControlPropInterface) => {
				return prevState.subtracting
					? { ...prevState, subtracting: false }
					: { ...prevState, subtracting: true };
			});
		}
	};
	//balance bad states
	useEffect(() => {
		// console.log(equationPropsObj.minEquationDigit.toString().length)
		if (!equationPropsObj.adding && !equationPropsObj.subtracting) {
			// console.log(' +- false');
			setEquationPropsObj((prevState: EquationControlPropInterface) => ({
				//other states in obj stay the same
				...prevState,
				adding: true,
			}));
		}
		setMinDigitInputWidth(
			inputWidthHandler(equationPropsObj.minEquationDigit.toString().length),
		);
		setMaxDigitInputWidth(
			inputWidthHandler(equationPropsObj.maxEquationDigit.toString().length),
		);
	}, [equationPropsObj]);

	useEffect(() => {
		// console.log(console.log('equationPropsObj.minEquationDigit changed'))
		if (
			equationPropsObj.minEquationDigit >= equationPropsObj.maxEquationDigit
		) {
			setEquationPropsObj((prevState: EquationControlPropInterface) => ({
				//other states in obj stay the same
				...prevState,
				maxEquationDigit: prevState.minEquationDigit + 1,
			}));
		}
	}, [equationPropsObj.minEquationDigit]);

	useEffect(() => {
		if (
			equationPropsObj.maxEquationDigit <= equationPropsObj.minEquationDigit
		) {
			setEquationPropsObj((prevState: EquationControlPropInterface) => ({
				//other states in obj stay the same
				...prevState,
				minEquationDigit: prevState.minEquationDigit - 1,
			}));
		}
	}, [equationPropsObj.maxEquationDigit]);
	return (
		<div className='d-flex flex-column align-items-center mx-3'>
			<h3 className='text-center'>Выберите опции</h3>
			<div className='d-flex flex-row'>
				<div className='d-flex flex-column align-items-center mx-3'>
					<h4>Диапазон чисел:</h4>
					<div className='d-flex flex-row flex-wrap align-items-center'>
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
								value={equationPropsObj.minEquationDigit}
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
								value={equationPropsObj.maxEquationDigit}
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
								checked={equationPropsObj.adding}
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
								defaultChecked={equationPropsObj.subtracting}
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

//equation trainer component
const EquationTrainer = (props: equationTrainerPropType): JSX.Element => {
	const { equationPropsObj, startStopState, setMistakesQuantity, setCorrectAnswersQuantity } = props;

	return (
		<div className='d-flex flex-column align-items-center mx-3'>
			<h3 className='text-center'>Выберите опции</h3>
			<div className='d-flex flex-row'>
				<div className='d-flex flex-row align-items-center mx-3'>
					<h4>Диапазон чисел:</h4>
					<div className='d-flex flex-row flex-wrap align-items-center'>
						<div
							id='from'
							className='d-flex flex-column flex-wrap align-items-center'>
							<h4>От</h4>
							
						</div>
						<div
							id='to'
							className='d-flex flex-column flex-wrap align-items-center'>
							<h4 className='ms-2'>до</h4>
							
						</div>
					</div>
				</div>	
			</div>
		</div>
	);
};

let timerInterval: ReturnType<typeof setInterval>;
const App = (): JSX.Element => {
	const [bgColor, setBgColor] = useState<string>('gray');
	const [equationProps, setEquationProps] =
		useState<EquationControlPropInterface>({
			minEquationDigit: 0,
			maxEquationDigit: 10,
			adding: true,
			subtracting: false,
		});
	const [timerMinutes, setTimerMinutes] = useState<number>(0);
	const [timerSeconds, setTimerSeconds] = useState<number>(0);
	const [startStopState, setStartStopState] = useState<string>('stop');
	const [correctAnswersNumber, setCorrectAnswersNumber] = useState<number>(0);
	const [wrongAnswersNumber, setWrongAnswersNumber] = useState<number>(0);

	const minutesCounter: (prevState: number) => number = (prevState) => {
		return prevState + 1;
	};

	const secondsCounter: (prevState: number) => number = (prevState) => {
		if (prevState + 1 === 60) {
			setTimerMinutes((prevState) => minutesCounter(prevState));
			return 0;
		} else return prevState + 1;
	};

	const startTimerHandler: () => void = () => {
		timerInterval = setInterval(() => {
			setTimerSeconds((prevState) => secondsCounter(prevState));
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
		setStartStopState('stop');
		clearInterval(timerInterval);
		setTimerMinutes(0);
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
					<EquationControl
						equationPropsObj={equationProps}
						setEquationPropsObj={setEquationProps}
						startStopState={startStopState}
					/>
				</div>
				{/* start_stop block */}
				<div className='d-flex flex-row mb-3'>
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
				<div className="d-flex flex-row flex-wrap align-items-center justify-content-center">
					<div className='d-flex flex-column align-items-center'>
						<h4
							id='timer-label'
							style={{ width: 'max-content' }}>
							Время после старта
						</h4>
						<h1 id='time-left'>
							{timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}:
							{timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}
						</h1>
					</div>
					<div className='d-flex flex-column align-items-center'>
						<h4
							id='timer-label'
							style={{ width: 'max-content' }}>
							Число верных ответов:
						</h4>
						<h1 id='time-left'>
							{correctAnswersNumber}
						</h1>
					</div>
					<div className='d-flex flex-column align-items-center'>
						<h4
							id='timer-label'
							style={{ width: 'max-content' }}>
							Число неверных ответов:
						</h4>
						<h1 id='time-left'>
							{wrongAnswersNumber}
						</h1>
					</div>
				</div>
				
				<EquationTrainer
					equationPropsObj={equationProps}
					startStopState={startStopState}
					setMistakesQuantity={setCorrectAnswersNumber}
					setCorrectAnswersQuantity={setWrongAnswersNumber}
				/>
			</div>
		</main>
	);
};

export default App;
