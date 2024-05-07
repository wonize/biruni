import { useStore } from "@biruni/react";
import { biruni, event, json, localstorage } from 'biruni';
import './Counter.css';

const CounterStore = biruni()
	.plug(event())
	.plug(json())
	.plug(localstorage('biruni-example-counter'))
	.init(() => ({ count: 0 }))

const Counter = () => {
	const counter = useStore(CounterStore);

	const reset = () => counter.set('count', 0);
	const increase = () => counter.set('count', (count) => count + 1);
	const decrease = () => counter.set('count', count => {
		if (count <= 0) return 0;
		return count - 1;
	});

	return (
		<div className="counter">
			<div className="output output--pretty">
				<p className="pretty">{counter.get('count')}</p>
				<p className="snippet"></p>
			</div>
			<div className="controls">
				<button className="increase" onClick={increase}>Increase</button>
				<button className="decrease" onClick={decrease}>Decrease</button>
				<button className="reset" onClick={reset}>Reset</button>
			</div>
		</div>
	)
}

export { Counter };
