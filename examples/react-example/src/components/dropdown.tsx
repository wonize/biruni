import React from 'react';

class DropDown extends React.Component<{ options: Record<string, React.JSX.Element> }, { open: boolean, value: string }> {
	public constructor(props: any) {
		super(props)

		this.state = {
			open: false,
			value: Object.keys(props.options)[0],
		}
	}

	setValue = (value: unknown) => {
		this.setState((s) => Object.assign({}, s, { value }));
	}

	toggle = () => {
		this.setState((s) => Object.assign({}, s, { open: !s.open }))
	}

	render(): React.ReactNode {
		return (
			<div className='App'>
				<div className='example-output'>
					{this.props.options[this.state.value]}
				</div>
				<div
					className={'example-select'.concat(this.state.open ? ' open' : '')}
					onClick={() => this.toggle()}>
					<ul className='example-list' data-selected={this.state.value}>
						{Object.keys(this.props.options).map((option: string) => (
							<DropDown.Option key={option} setter={this.setValue.bind(this)} value={option} />
						))}
					</ul>
				</div>
			</div>
		)
	}

	static Option = (props: any) => {
		return (
			<li
				className="example-option"
				onClick={() => props.setter(props.value)}>
				{props.value}
			</li>
		)
	}
}

export { DropDown };
