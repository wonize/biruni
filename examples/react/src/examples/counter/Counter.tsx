import { useStore } from '@biruni/react';
import { biruni } from 'biruni';
import { recommended } from 'biruni/built-in';
import './Counter.css';

const CounterStore = biruni('biruni-example-counter')
	.plug(recommended())
	.init(() => ({ count: 0 }));

const Counter = () => {
	const counter = useStore(CounterStore);

	const reset = () => counter.set('count', 0);
	const increase = () => counter.set('count', (count) => count + 1);
	const decrease = () =>
		counter.set('count', (count) => {
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
				<button className="increase" onClick={increase}>
					Increase
				</button>
				<button className="decrease" onClick={decrease}>
					Decrease
				</button>
				<button className="reset" onClick={reset}>
					Reset
				</button>
			</div>
		</div>
	);
};

export { Counter };
