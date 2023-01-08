import React, {
	useState,
	useEffect,
	useLayoutEffect,
	useRef,
	//import react types
	Dispatch,
	SetStateAction,
	ChangeEvent,
	KeyboardEventHandler,
	MouseEvent,
} from 'react';

import {
	BsArrowUpCircle,
	BsArrowDownCircle,
	BsCheck2Circle,
	BsFillBackspaceFill,
	BsXCircle,
} from 'react-icons/bs';
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
interface PadPanelPropsInterface {
	answerArr: string[];
	attempsNumber: number;
	prevEquiations: PrevEquationObjInterface[];
}
interface PrevEquationObjInterface {
	prevEquation: string;
	answerStatus: string;
}
type setEquationPropsType = Dispatch<
	SetStateAction<EquationControlPropInterface>
>;
type startStopStateType = string;
type equationControlPropsType = {
	equationPropsObj: EquationControlPropInterface;
	setEquationPropsObj: setEquationPropsType;
	startStopState: startStopStateType;
};

type equationTrainerPropType = Omit<
	equationControlPropsType,
	'setEquationPropsObj'
> & {
	setMistakesQuantity: Dispatch<SetStateAction<number>>;
	setCorrectAnswersQuantity: Dispatch<SetStateAction<number>>;
	padPanelPropsObj: PadPanelPropsInterface;
	setPadPanelProps: setPadPanelPropsType;
};
type keyPressedValueType = string | undefined;
type keystrokesNumberType = number;
type setPadPanelPropsType = Dispatch<SetStateAction<PadPanelPropsInterface>>;
type buttonPropType = {
	id: string;
	num: string | number;
	keyPressedValue: keyPressedValueType;
	keystrokesNumber: keystrokesNumberType;
	startStopState: startStopStateType;
	setPadPanelProps: setPadPanelPropsType;
};
type buttonsPanelPropType = Omit<buttonPropType, 'id' | 'num'> & {
	padPanelPropsObj: PadPanelPropsInterface;
	setPadPanelProps: setPadPanelPropsType;
};
//**********************control_component**********************************/
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

	const typeMinDigitHandler: (event: ChangeEvent<HTMLInputElement>) => void = (
		event,
	) => {
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
							className='d-flex flex-column flex-wrap align-items-center'
						>
							<h4>От</h4>
							<button
								id='minDigitIncrement'
								className={
									(startStopState === 'stop'
										? 'buttonClickAnimation '
										: 'buttonDisableStyle ') + 'timerButton hoverAnimation'
								}
								onClick={increaseMinDigit}
							>
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
										: 'buttonDisableStyle ') + 'timerButton hoverAnimation'
								}
								onClick={decreaseMinDigit}
							>
								<BsArrowDownCircle />
							</button>
						</div>
						<div
							id='to'
							className='d-flex flex-column flex-wrap align-items-center'
						>
							<h4 className='ms-2'>до</h4>
							<button
								id='maxDigitIncrement'
								className={
									(startStopState === 'stop'
										? 'buttonClickAnimation '
										: 'buttonDisableStyle ') + 'timerButton hoverAnimation'
								}
								onClick={increaseMaxDigit}
							>
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
										: 'buttonDisableStyle ') + 'timerButton hoverAnimation'
								}
								onClick={decreaseMaxDigit}
							>
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
							htmlFor='adding'
						>
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
							htmlFor='adding'
						>
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

//**********************equation_trainer_component*************************/
const EquationTrainer = (props: equationTrainerPropType): JSX.Element => {
	const {
		equationPropsObj,
		startStopState,
		setMistakesQuantity,
		setCorrectAnswersQuantity,
		padPanelPropsObj,
		setPadPanelProps,
	} = props;
	const [randomFirstDigit, setRandomFirstDigit] = useState<number>(
		equationPropsObj.minEquationDigit,
	);
	const [randomSecondDigit, setRandomSecondDigit] = useState<number>(
		equationPropsObj.maxEquationDigit,
	);
	const [randomArithmeticOperator, setRandomArithmeticOperator] =
		useState<string>('+');
	const [answerState, setAnswerState] = useState<string>('zero');

	//generate operator
	const randomArithmeticOperatorGeneretor: () => string = () => {
		const operatorsArr: string[] = [];
		if (equationPropsObj.adding) {
			operatorsArr.push('+');
		}
		if (equationPropsObj.subtracting) {
			operatorsArr.push('-');
		}
		// console.log(operatorsArr.length)
		if (operatorsArr.length > 1) {
			return operatorsArr[Math.round(Math.random())];
		} else {
			return operatorsArr[0];
		}
	};

	useEffect(() => {
		//generate new equation and check answer if starting
		if (startStopState === 'start') {
			//calculate answer
			const calculateAnswer = () => {
				return eval(
					randomFirstDigit.toString() +
						randomArithmeticOperator +
						randomSecondDigit.toString(),
				);
			};

			//comparig answers
			// console.log(parseInt(padPanelPropsObj.answerArr.join('')));
			// console.log(calculateAnswer());
			let currAnswerStatus = '';
			if (parseInt(padPanelPropsObj.answerArr.join('')) === calculateAnswer()) {
				setCorrectAnswersQuantity((prevState) => prevState + 1);
				currAnswerStatus = 'correct';
			} else {
				setMistakesQuantity((prevState) => prevState + 1);
				currAnswerStatus = 'wrong';
			}
			setAnswerState(currAnswerStatus);
			//add equation to array
			setPadPanelProps((prevState) => ({
				...prevState,
				prevEquiations: [
					...prevState.prevEquiations,
					{
						prevEquation:
							randomFirstDigit.toString() +
							randomArithmeticOperator +
							randomSecondDigit.toString() +
							'=' +
							(isNaN(parseInt(padPanelPropsObj.answerArr.join('')))
								? ''
								: parseInt(padPanelPropsObj.answerArr.join(''))),
						answerStatus: currAnswerStatus,
					},
				],
			}));
			console.log(padPanelPropsObj.prevEquiations);
			const timer = setTimeout(() => {
				setAnswerState('zero');
				//clear current answer
				setPadPanelProps((prevState) => ({
					...prevState,
					answerArr: [] as string[],
				}));
				//create new equation
				const maxDigit = equationPropsObj.maxEquationDigit;
				const minDigit = equationPropsObj.minEquationDigit;
				const firstDigit =
					Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;
				const secondDigit =
					Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;
				const randomOperator = randomArithmeticOperatorGeneretor();
				if (firstDigit > secondDigit || randomOperator === '+') {
					setRandomFirstDigit(firstDigit);
					setRandomSecondDigit(secondDigit);
				} else {
					setRandomFirstDigit(secondDigit);
					setRandomSecondDigit(firstDigit);
				}

				setRandomArithmeticOperator(randomOperator);
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [padPanelPropsObj.attempsNumber]);

	useEffect(() => {
		//generate new equation and check answer if starting
		if (startStopState === 'start') {
			//clear current answer
			setPadPanelProps((prevState) => ({
				...prevState,
				answerArr: [] as string[],
			}));
			//create new equation
			const maxDigit = equationPropsObj.maxEquationDigit;
			const minDigit = equationPropsObj.minEquationDigit;
			setRandomFirstDigit(
				Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit,
			);
			setRandomSecondDigit(
				Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit,
			);

			setRandomArithmeticOperator(randomArithmeticOperatorGeneretor());
		}
	}, [startStopState]);

	return (
		<div
			style={{
				backgroundColor:
					answerState === 'correct'
						? 'green'
						: answerState === 'wrong'
						? 'red'
						: '',
			}}
			className='d-flex flex-column align-items-center mx-3 rounded p-2'
		>
			<h3 className='text-center'>
				{answerState === 'correct' ? (
					<span className='alertFadeIn'>
						Молодец <BsCheck2Circle />
					</span>
				) : answerState === 'wrong' ? (
					<span className='alertFadeIn'>
						Не верно
						<BsXCircle />
					</span>
				) : (
					<span className='alertFadeIn1'>Пример:</span>
				)}
			</h3>
			<div
				className={
					'd-flex flex-row ' + (answerState === 'zero' && 'alertFadeIn')
				}
			>
				<div className='d-flex flex-row align-items-center mx-3'>
					<h1>{randomFirstDigit}</h1>
					<h1>{randomArithmeticOperator}</h1>
					<h1>{randomSecondDigit}</h1>
					<h1>=</h1>
					<h1>{padPanelPropsObj.answerArr}</h1>
				</div>
			</div>
		</div>
	);
};

//**********************button_component***********************************/
const ButtonComponent = (props: buttonPropType): JSX.Element => {
	const {
		id,
		num,
		keyPressedValue,
		keystrokesNumber,
		startStopState,
		setPadPanelProps,
	} = props;

	const [padStateClass, setPadClass] = useState<string>('padStyleActive');
	const padToggleStyle: () => void = () => {
		setPadClass((pervState) => {
			// console.log(pervState);
			if (pervState === 'padStyleActive') {
				return 'padStylePressed';
			} else {
				return 'padStyleActive';
			}
		});
	};
	//console.log(keySound.volume);
	const padPressed: (event: MouseEvent<HTMLButtonElement>) => void = (
		event,
	) => {
		// console.log('padPressed func activated');
		//for access to previous state use prevState as mentioned below
		if (startStopState === 'start') {
			let currNum: string;
			//check in not undefined
			if (event.currentTarget.dataset.num) {
				currNum = event.currentTarget.dataset.num;
				if (currNum === 'check') {
					setPadPanelProps((prevState) => ({
						...prevState,
						attempsNumber: prevState.attempsNumber + 1,
					}));
				} else if (currNum === 'del') {
					setPadPanelProps((prevState) => {
						// console.log([...prevState.answerArr]);
						if (prevState.answerArr.length === 0) {
							return prevState;
						} else {
							//copy original array
							const copyArray = [...prevState.answerArr];
							//remove last element from copyArray
							copyArray.pop();
							// console.log(copyArray);
							if (copyArray) {
								return {
									...prevState,
									answerArr: copyArray,
								};
							} else return prevState;
						}
					});
				} else {
					setPadPanelProps((prevState) => ({
						...prevState,
						answerArr: [...prevState.answerArr, currNum],
					}));
				}
			}
			// console.log(event.currentTarget.dataset.num);
			padToggleStyle();
			setTimeout(() => padToggleStyle(), 250);
		}
	};
	//console.log(keyTrigger + " button rendered");
	const handelKeyPress: (keyPressCode: keyPressedValueType) => void = (
		keyPressCode,
	) => {
		// console.log('handelKeyPress func activated');
		// console.log(keyPressCode);
		// console.log(Number(keyPressCode) === num);

		if (keyPressCode === 'Enter' && num === 'check') {
			// padPressed();
		} else if (keyPressCode === num) {
			// padPressed();
		}
	};

	useEffect(() => {
		handelKeyPress(keyPressedValue);
	}, [keyPressedValue, keystrokesNumber]);
	return (
		<button
			id={id}
			data-num={num}
			className={
				'btn-lg flex-fill btn btn-primary padStyle ' +
				(startStopState === 'start' ? padStateClass : 'padStyleInactive')
			}
			onClick={padPressed}
		>
			{num === 'check' ? (
				<p className='m-0 fs-3'>
					Проверить
					<BsCheck2Circle />
				</p>
			) : num === 'del' ? (
				<p className='m-0 fs-2'>
					<BsFillBackspaceFill />
				</p>
			) : (
				<p className='m-0 fs-2'>{num}</p>
			)}
		</button>
	);
};

//**********************buttons_panel_component****************************/
const ButtonsPanel = (props: buttonsPanelPropType): JSX.Element => {
	//console.log("ButtonsPanel component rendered");
	const {
		keyPressedValue,
		keystrokesNumber,
		startStopState,
		padPanelPropsObj,
		setPadPanelProps,
	} = props;

	const appDivRef = useRef<HTMLDivElement>(null);

	//after start focus on button panel
	useEffect(() => {
		//object can be null
		if (appDivRef.current !== null && startStopState === 'start') {
			appDivRef.current.focus();
		}
	}, [startStopState]);
	return (
		<div
			id='buttonsPanel'
			ref={appDivRef}
			tabIndex={0}
			className='m-1 column'
			style={{ width: '320px' }}
		>
			<div className='calcButtonsRow row'>
				<div className='col-8 p-1 col'>
					<ButtonComponent
						id='checkAnswer'
						num={'check'}
						keyPressedValue={keyPressedValue}
						keystrokesNumber={keystrokesNumber}
						startStopState={startStopState}
						setPadPanelProps={setPadPanelProps}
					/>
				</div>
				<div className='col-4 p-1 col'>
					<ButtonComponent
						id='del'
						num={'del'}
						keyPressedValue={keyPressedValue}
						keystrokesNumber={keystrokesNumber}
						startStopState={startStopState}
						setPadPanelProps={setPadPanelProps}
					/>
				</div>
			</div>
			<div className='row'>
				<div className='col-8 col'>
					<div className='calcButtonsRow row'>
						<div className='col-6 p-1 col'>
							<ButtonComponent
								id={'seven'}
								num={'7'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
						<div className='col-6 p-1 col'>
							<ButtonComponent
								id={'eight'}
								num={'8'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
					</div>
					<div className='calcButtonsRow row'>
						<div className='col-6 p-1 col'>
							<ButtonComponent
								id={'four'}
								num={'4'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
						<div className='col-6 p-1 col'>
							<ButtonComponent
								id={'five'}
								num={'5'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
					</div>
					<div className='calcButtonsRow row'>
						<div className='col-6 p-1 col'>
							<ButtonComponent
								id={'one'}
								num={'1'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
						<div className='col-6 p-1 col'>
							<ButtonComponent
								id={'two'}
								num={'2'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
					</div>
					<div className='calcButtonsRow row'>
						<div className='col-12 p-1 col'>
							<ButtonComponent
								num={'0'}
								id={'zero'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
					</div>
				</div>
				<div className='col-4 col'>
					<div className='calcButtonsRow row'>
						<div className='p-1 col'>
							<ButtonComponent
								id={'nine'}
								num={'9'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
					</div>
					<div className='calcButtonsRow row'>
						<div className='p-1 col'>
							<ButtonComponent
								id={'six'}
								num={'6'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
					</div>
					<div className='calcButtonsRow row'>
						<div className='p-1 col'>
							<ButtonComponent
								id={'three'}
								num={'3'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
					</div>
					<div className='calcButtonsRow row'>
						<div className='p-1 col'>
							<ButtonComponent
								id='decimal'
								num={'.'}
								keyPressedValue={keyPressedValue}
								keystrokesNumber={keystrokesNumber}
								startStopState={startStopState}
								setPadPanelProps={setPadPanelProps}
							/>
						</div>
					</div>
				</div>
			</div>
			{
				<div id='oldEquiatonsList'>
					<h3
						className={
							padPanelPropsObj.prevEquiations.length === 0 ? 'hidden' : ''
						}
					>
						Результыты решений:
					</h3>
					{padPanelPropsObj.prevEquiations.map((el, i) => {
						return (
							<h3 key={i + 1}>
								Пример {' ' + (i + 1) + ': '}{' '}
								<span
									style={{
										backgroundColor:
											el.answerStatus === 'correct' ? 'green' : 'red',
									}}
								>
									{el.prevEquation}
								</span>
							</h3>
						);
					})}
				</div>
			}
		</div>
	);
};

//**********************main_app*******************************************/
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
	const [padPanelProps, setPadPanelProps] = useState<PadPanelPropsInterface>({
		answerArr: [] as string[],
		attempsNumber: 0,
		prevEquiations: [] as PrevEquationObjInterface[],
	});
	const [timerMinutes, setTimerMinutes] = useState<number>(0);
	const [timerSeconds, setTimerSeconds] = useState<number>(0);
	const [startStopState, setStartStopState] = useState<string>('stop');
	const [correctAnswersNumber, setCorrectAnswersNumber] = useState<number>(0);
	const [wrongAnswersNumber, setWrongAnswersNumber] = useState<number>(0);
	const [keyPressedValue, setKeyPressedValue] = useState<keyPressedValueType>();
	const [keystrokesNumber, setKeystrokesNumber] =
		useState<keystrokesNumberType>(0);

	const appMainRef = useRef<HTMLElement>(null);

	const handelKeyPress: KeyboardEventHandler<HTMLElement> = (event) => {
		// console.log(event.key);
		setKeyPressedValue(event.key);
		keystrokesNumber > 10
			? setKeystrokesNumber(0)
			: setKeystrokesNumber(keystrokesNumber + 1);
	};

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
		setWrongAnswersNumber(0);
		setCorrectAnswersNumber(0);
		//add equation to array
		setPadPanelProps({
			answerArr: [] as string[],
			attempsNumber: 0,
			prevEquiations: [],
		});
	};

	//focus on the app's div for keyDown react listner
	useEffect(() => {
		//object can be null
		if (appMainRef.current !== null) {
			appMainRef.current.focus();
		}
	}, []);

	useLayoutEffect(() => {
		setBgColor(colorArray[Math.floor(Math.random() * 10)]);
	}, []);
	return (
		<main
			id='container'
			ref={appMainRef}
			tabIndex={0}
			onKeyDown={handelKeyPress}
			className='d-flex justify-content-center align-items-center elementFadeIn p-5'
			style={{
				backgroundColor: bgColor,
			}}
		>
			<div
				id='app'
				className='d-flex flex-column align-items-center appContainer'
			>
				<h2
					id='firstLineTitle'
					style={{ width: 'max-content' }}
				>
					Тренажёр арифметики.
				</h2>
				<h2
					id='seconLineTitle'
					style={{ width: 'max-content' }}
				>
					Первый класс.
				</h2>
				<div
					id='controlBlock'
					className='d-flex'
				>
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
						className='controlButton hoverAnimation'
						onClick={toggleTimerHandler}
					>
						<AiOutlinePlayCircle />/
						<AiOutlinePauseCircle />
					</button>
					<button
						id='reset'
						className='controlButton hoverAnimation'
						onClick={refreshHandler}
					>
						<FiRefreshCcw />
					</button>
				</div>
				<div className='d-flex flex-row flex-wrap align-items-center justify-content-center'>
					<div className='d-flex flex-column align-items-center mx-3'>
						<h4
							id='timer-label'
							style={{ width: 'max-content' }}
						>
							Число неверных ответов:
						</h4>
						<h1 id='time-left'>{wrongAnswersNumber}</h1>
					</div>
					<div className='d-flex flex-column align-items-center mx-3'>
						<h4
							id='timer-label'
							style={{ width: 'max-content' }}
						>
							Число верных ответов:
						</h4>
						<h1 id='time-left'>{correctAnswersNumber}</h1>
					</div>
				</div>
				<div className='d-flex flex-column align-items-center appDivRef'>
					<h4
						id='timer-label'
						style={{ width: 'max-content' }}
					>
						Время после старта
					</h4>
					<h1 id='time-left'>
						{timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}:
						{timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}
					</h1>
				</div>
				<EquationTrainer
					equationPropsObj={equationProps}
					startStopState={startStopState}
					setMistakesQuantity={setWrongAnswersNumber}
					setCorrectAnswersQuantity={setCorrectAnswersNumber}
					padPanelPropsObj={padPanelProps}
					setPadPanelProps={setPadPanelProps}
				/>
				<ButtonsPanel
					keyPressedValue={keyPressedValue}
					keystrokesNumber={keystrokesNumber}
					startStopState={startStopState}
					padPanelPropsObj={padPanelProps}
					setPadPanelProps={setPadPanelProps}
				/>
			</div>
		</main>
	);
};

export default App;
