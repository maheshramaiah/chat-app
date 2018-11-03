import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from './actionCreator';
import * as apiActions from './apiActions';
import * as selectors from './selector';
import {
    Input,
    Button,
    Loader
} from '../../../components/all.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.onRegisterBtnClick = this.onRegisterBtnClick.bind(this);
    }

    onFieldInputChange(key, val) {
        this.props.actions.onFieldTextChange(key, val);
    }

    async onRegisterBtnClick() {
        const props = this.props;
        const res = await props.apiActions.register(props.formFields);

        if (res.success) {
            this.navigate();
        }
    }

    navigate() {
        const props = this.props;

        props.history.push('/auth/login');
    }

    render() {
        const {
            formFields: {
                email, firstName, lastName, password
            },
            showLoader,
            registerStatus
        } = this.props;
        const disableBtn = email === '' || firstName === '' || lastName === '' || password === '';
        const { err = '' } = registerStatus;

        return (
            <div className="section-body">
                <form>
                    <Input type="text" label="email" value={email} onChange={(val) => this.onFieldInputChange('email', val)} />
                    <Input type="text" label="first name" value={firstName} onChange={(val) => this.onFieldInputChange('firstName', val)} />
                    <Input type="text" label="last name" value={lastName} onChange={(val) => this.onFieldInputChange('lastName', val)} />
                    <Input type="password" label="password" value={password} onChange={(val) => this.onFieldInputChange('password', val)} />
                    {err && <div className="error">{err}</div>}
                    <Button text="register" onClick={this.onRegisterBtnClick} disabled={disableBtn}></Button>
                </form>
                {showLoader && <Loader />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        formFields: selectors.getFormFields(state),
        showLoader: selectors.getLoaderFlag(state),
        registerStatus: selectors.getRegisterStatus(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
        apiActions: bindActionCreators(apiActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);