/**
 * Login Screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import FormValidation from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import AppAPI from '@lib/api';
import { AppStyles } from '@theme/';

// Components
import { Alerts, Card, Spacer, Text, Button } from '@ui/';

/* Component ==================================================================== */
class Login extends Component {
  static componentName = 'Login';

  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // Username Validation
    const validUsername = FormValidation.refinement(
      FormValidation.String, (username) => {
        if (username.length < 6) return false;
        return true;
      },
    );

    // Password Validation - Must be 6 chars long
    const validPassword = FormValidation.refinement(
      FormValidation.String, (password) => {
        if (password.length < 6) return false;
        return true;
      },
    );

    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct({
        Username: validUsername,
        Password: validPassword,
      }),
      empty_form_values: {
        Username: '',
        Password: '',
      },
      form_values: {},
      options: {
        auto: 'placeholders',
        fields: {
          Username: {
            surname: '用户名',
            error: '请输入一个有效的邮箱',
            autoCapitalize: 'none',
            clearButtonMode: 'while-editing',
          },
          Password: {
            surname: '密码',
            error: '你的新密码应该大于 6 位',
            clearButtonMode: 'while-editing',
            secureTextEntry: true,
          },
        },
      },
    };
  }

  componentDidMount = async () => {
    // Get user data from AsyncStorage to populate fields
    const values = await AsyncStorage.getItem('api/credentials');
    const jsonValues = JSON.parse(values);

    if (values !== null) {
      this.setState({
        form_values: {
          Username: jsonValues.username,
          Password: jsonValues.password,
        },
      });
    }
  };

  /**
    * Login
    */
  login = () => {
    // Get new credentials and update
    const credentials = this.form.getValue();

    // Form is valid
    if (credentials) {
      this.setState({ form_values: credentials }, () => {
        this.setState({ resultMsg: { status: '稍等片刻...' } });

        // Scroll to top, to show message
        if (this.scrollView) {
          this.scrollView.scrollTo({ y: 0 });
        }

        this.props.login({
          username: credentials.Username,
          password: credentials.Password,
        }, true).then(() => {
          this.setState({
            resultMsg: { success: '您已登录' },
          }, () => {
            setTimeout(() => {
              Actions.app({ type: 'reset' });
            }, 1000);
          });
        }).catch((err) => {
          const error = AppAPI.handleError(err);
          this.setState({ resultMsg: { error } });
        });
      });
    }
  };

  render = () => {
    const Form = FormValidation.form.Form;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        ref={(a) => { this.scrollView = a; }}
        style={[AppStyles.container]}
        contentContainerStyle={[  AppStyles.container]}
      >
        <Card>
          <Alerts
            status={this.state.resultMsg.status}
            success={this.state.resultMsg.success}
            error={this.state.resultMsg.error}
          />

          <Form
            ref={(b) => { this.form = b; }}
            type={this.state.form_fields}
            value={this.state.form_values}
            options={this.state.options}
          />

          <Button
            title={'登录'}
            onPress={this.login}
          />

          <Spacer size={10} />

          <TouchableOpacity onPress={Actions.passwordReset}>
            <Text p style={[AppStyles.textCenterAligned, AppStyles.link]}>
              忘记密码？
            </Text>
          </TouchableOpacity>

          <Spacer size={10} />

          <Text p style={[AppStyles.textCenterAligned]}>
            - - -  . - .
          </Text>

          <Button
            title={'注册'}
            onPress={Actions.signUp}
          />
        </Card>
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default Login;
