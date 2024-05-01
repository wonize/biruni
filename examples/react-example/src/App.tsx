import { CounterOutput as BiruniOutput } from './BiruniHook';
import { CounterOuput as ReactOutput } from './ReactHook';

export default function () {
	return (
		<div style={{ flexDirection: 'row', display: 'flex', gap: '10vw' }}>
			<div style={{ maxWidth: '45vw' }}>
				<ReactOutput />
			</div>
			<hr />
			<div style={{ maxWidth: '45vw' }}>
				<BiruniOutput />
			</div>
		</div>
	)
}