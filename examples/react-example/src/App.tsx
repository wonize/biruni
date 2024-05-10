import { DropDown } from './components/dropdown';
import { Counter } from './examples/counter/mod';

export default function () {
	const Examples = {
		['Counter']: <Counter />,
		['User Preference']: <div>User Preference</div>,
		['Zustand']: <div>Zustand Example</div>,
	};

	return <DropDown options={Examples} />;
}
