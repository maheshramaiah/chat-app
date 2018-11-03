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
} from '../../../components/all';
import Storage from '../../../utils/storage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.onLoginBtnClick = this.onLoginBtnClick.bind(this);
    }

    onFieldInputChange(key, val) {
        this.props.actions.onFieldTextChange(key, val);
    }

    async onLoginBtnClick() {
        const props = this.props;
        const res = await props.apiActions.login(props.formFields);

        if (res.success) {
            Storage.save('userInfo', res.user);
            this.navigate();
        }
    }

    navigate() {
        const props = this.props;

        props.history.push('/dashboard');
    }

    render() {
        const {
            formFields: {
                email, password
            },
            showLoader,
            loginStatus
        } = this.props;
        const disableBtn = email === '' || password === '';
        const {err = ''} = loginStatus;

        return (
            <div className="section-body">
                <form>
                    <Input type="text" label="email" value={email} onChange={(val) => this.onFieldInputChange('email', val)} />
                    <Input type="password" label="password" value={password} onChange={(val) => this.onFieldInputChange('password', val)} />
                    {err && <div className="error">{err}</div>}
                    <Button text="login" onClick={this.onLoginBtnClick} disabled={disableBtn}></Button>
                </form>
                {showLoader && <Loader />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formFields: selectors.getFormFields(state),
        showLoader: selectors.getLoaderFlag(state),
        loginStatus: selectors.getLoginStatus(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
        apiActions: bindActionCreators(apiActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);