import React from 'react';

export default function loadAsyncComponent(getComp) {
	return class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				Component: null
			};
		}

		async componentWillMount() {
			try {
				const module = await getComp();

				this.setState({
					Component: module
				})
			}
			catch (e) {
				console.log(`Error loading component: ${e}`);
			}
		}

		render() {
			const { Component } = this.state;

			if (Component) {
				return <Component {...this.props} />
			}

			return null;
		}
	}
}