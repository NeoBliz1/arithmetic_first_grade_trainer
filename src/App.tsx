import React, {
	useState,
	useLayoutEffect,
	useRef,
	//import react types
	MutableRefObject,
	Dispatch,
	SetStateAction,
	FC,
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

interface timeControlType {
	id?: string;
	name: string;
	length: number;
}
type setSessionLengthType = Dispatch<SetStateAction<timeControlType>>;

type TimeControlPropsType = {
	timeControlObj: timeControlType;
	setState: setSessionLengthType;
	currAction: string;
	startStopState: string;
	setTimerMinutes: Dispatch<SetStateAction<number>>;
	setTimerSeconds: Dispatch<SetStateAction<number>>;
};

const EquiationControl: FC<TimeControlPropsType> = (
	props: TimeControlPropsType,
) => {
	const {
		timeControlObj,
		setState,
		currAction,
		startStopState,
		setTimerMinutes,
		setTimerSeconds,
	} = props;
	const refreshActionLength: (
		prevState: timeControlType,
		arithmeticOperation: string,
	) => timeControlType = (prevState, arithmeticOperation) => {
		let newlengthState: number;
		if (arithmeticOperation === 'increase') {
			newlengthState = prevState.length === 60 ? 60 : prevState.length + 1;
		} else {
			newlengthState = prevState.length === 1 ? 1 : prevState.length - 1;
		}

		if (prevState.name === currAction) {
			setTimerMinutes(newlengthState);
			setTimerSeconds(0);
		}
		return {
			id: prevState.id,
			name: prevState.name,
			length: newlengthState,
		};
	};
	const increaseLength: () => void = () => {
		if (startStopState === 'stop') {
			setState((prevState: timeControlType) =>
				refreshActionLength(prevState, 'increase'),
			);
		}
	};

	const decreaseLength: () => void = () => {
		if (startStopState === 'stop') {
			setState((prevState: timeControlType) =>
				refreshActionLength(prevState, 'decrease'),
			);
		}
	};
	return (
		<div
			id={timeControlObj.name}
			className="d-flex flex-column align-items-center mx-3">
			<h3 id={timeControlObj.id + '-label'} className="text-center">
				Выберите опции
			</h3>
			<div className="d-flex flex-row bd-highlight mb-3">
				<div className="d-flex flex-column align-items-center mx-3">
					<h4>Диапазон чисел:</h4>
					<div className="d-flex flex-row align-items-center bd-highlight mb-3">
						<h4>От</h4>
						<button
							id={timeControlObj.id + '-increment'}
							className={
								(startStopState === 'stop'
									? 'buttonClickAnimation '
									: 'buttonDisableStyle ') +
								'timerButton hoverAnimationDuration'
							}
							onClick={increaseLength}>
							<BsArrowUpCircle />
						</button>
						<h2 id={timeControlObj.id + '-length'}>{timeControlObj.length}</h2>
						<button
							id={timeControlObj.id + '-decrement'}
							className={
								(startStopState === 'stop'
									? 'buttonClickAnimation '
									: 'buttonDisableStyle ') +
								'timerButton hoverAnimationDuration'
							}
							onClick={decreaseLength}>
							<BsArrowDownCircle />
						</button>
						<h4 className="ms-2">до!</h4>
						<button
							id={timeControlObj.id + '-increment'}
							className={
								(startStopState === 'stop'
									? 'buttonClickAnimation '
									: 'buttonDisableStyle ') +
								'timerButton hoverAnimationDuration'
							}
							onClick={increaseLength}>
							<BsArrowUpCircle />
						</button>
						<h2 id={timeControlObj.id + '-length'}>{timeControlObj.length}</h2>
						<button
							id={timeControlObj.id + '-decrement'}
							className={
								(startStopState === 'stop'
									? 'buttonClickAnimation '
									: 'buttonDisableStyle ') +
								'timerButton hoverAnimationDuration'
							}
							onClick={decreaseLength}>
							<BsArrowDownCircle />
						</button>
					</div>
				</div>
				<div>
					<h4>Доступные действия:</h4>
					<div className="d-flex flex-row bd-highlight m-2">
						<label className="h4" htmlFor="adding">
							Сложение (+)
						</label>
						<input className="m-2" type="checkbox" id="adding" name="adding" />
					</div>
					<div className="d-flex flex-row bd-highlight m-2">
						<label className="h4" htmlFor="subtracting">
							Вычитание (-)
						</label>
						<input
							className="m-2"
							type="checkbox"
							id="subtracting"
							name="subtracting"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

let timerInterval: ReturnType<typeof setInterval>;
const App: FC = () => {
	const [bgColor, setBgColor] = useState<string>('gray');
	const [breakLength, setBrakeLength] = useState<timeControlType>({
		id: 'break',
		name: 'Break',
		length: 5,
	});
	const [sessionLength, setSessionLength] = useState<timeControlType>({
		id: 'session',
		name: 'Session',
		length: 25,
	});
	const [timerMinutes, setTimerMinutes] = useState<number>(25);
	const [timerSeconds, setTimerSeconds] = useState<number>(0);
	const [currAction, setCurrAction] = useState<string>('Session');
	const [startStopState, setStartStopState] = useState<string>('stop');
	const audioHtmlEl = useRef() as MutableRefObject<HTMLAudioElement>;
	const currAudioHtmlEL = audioHtmlEl.current;

	const toggleCurrAction: (prevState: string) => string = (prevState) => {
		setTimerSeconds(0);
		if (prevState === 'Session') {
			setTimerMinutes(breakLength.length);
			return 'Brake';
		} else {
			setTimerMinutes(sessionLength.length);
			return 'Session';
		}
	};

	const minutesContdown: (prevState: number) => number = (prevState) => {
		if (prevState - 1 < 0) {
			currAudioHtmlEL.play();
			setCurrAction((prevState) => toggleCurrAction(prevState));
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
		setSessionLength((prevState: timeControlType) => ({
			id: prevState.id,
			name: prevState.name,
			length: 25,
		}));
		setBrakeLength((prevState: timeControlType) => ({
			id: prevState.id,
			name: prevState.name,
			length: 5,
		}));
		setTimerMinutes(25);
		setTimerSeconds(0);
	};

	useLayoutEffect(() => {
		setBgColor(colorArray[Math.floor(Math.random() * 10)]);
	}, []);
	return (
		<main
			id="container"
			className="vh-100 d-flex justify-content-center align-items-center elementFadeIn"
			style={{ backgroundColor: bgColor }}>
			<div
				id="app"
				className="d-flex flex-column align-items-center appContainer">
				<h2 id="firstLineTitle" style={{ width: 'max-content' }}>
					Тренажёр арифметики.
				</h2>
				<h2 id="seconLineTitle" style={{ width: 'max-content' }}>
					Первый класс.
				</h2>
				<div id="controlBlock" className="d-flex">
					<EquiationControl
						timeControlObj={breakLength}
						setState={setBrakeLength}
						currAction={currAction}
						startStopState={startStopState}
						setTimerMinutes={setTimerMinutes}
						setTimerSeconds={setTimerSeconds}
					/>
				</div>
				<div className="d-flex flex-column align-items-center">
					<h4 id="timer-label" style={{ width: 'max-content' }}>
						{currAction}
					</h4>
					<h1 id="time-left">
						{timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}:
						{timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}
					</h1>
				</div>
				<div className="d-flex flex-row">
					<button
						id="start_stop"
						className="controlButton hoverAnimationDuration"
						onClick={toggleTimerHandler}>
						<AiOutlinePlayCircle />/
						<AiOutlinePauseCircle />
					</button>
					<button
						id="reset"
						className="controlButton hoverAnimationDuration"
						onClick={refreshHandler}>
						<FiRefreshCcw />
					</button>
				</div>
				<audio
					id="beep"
					ref={audioHtmlEl}
					preload="auto"
					src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
				/>
			</div>
		</main>
	);
};

export default App;
