import { useStore } from '@biruni/react';
import { biruni, json, localstorage } from 'biruni';
import { event } from 'biruni/built-in';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

type CounterInterface = {
	count: number;
}

const CounterStore = biruni<CounterInterface>()
	.plug(json())
	.plug(event())
	.plug(localstorage('biruni-localstorage-example'))
	.init(() => ({ count: 1 }));

export const CounterOutput = () => {
	const counter = useStore(CounterStore);

	return (
		<div>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => counter.set('count', (count) => ((count ?? 1) + 1))}>
					count is {counter.get('count')}
				</button>
				<p>
					Edit <code>src/BiruniHook.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</div>
	)
}