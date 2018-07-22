<template>
    <div id="login-contain">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRule" class="login-form">
            <el-form-item prop="username">
                <span class="svg-container">
                    <icon-svg icon-class="yonghu"></icon-svg>
                </span>
                <el-input type="text" v-model="loginForm.username" :placeholder="$t('login.username')"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <icon-svg icon-class="mima"></icon-svg>
                </span>
                <el-input type="password" v-model="loginForm.password" :placeholder="$t('login.password')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="handLogin" id="login-btn">{{ $t('login.login') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { isUsername } from 'utils/validate';
import { loginByUsername } from 'api/login';
// import { loginByUsername, refreshToken } from 'api/login';
// import autorefresh from 'jwt-autorefresh';

// /** Your refresh token mechanism, returning a promise that resolves to the new access tokenFunction (library does not care about your method of persisting tokens) */
// const refresh = () => {
//     // const init = {
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type': 'application/x-www-form-urlencoded'
//     //     },
//     //     body: `refresh_token=${localStorage.refresh_token}&grant_type=refresh_token`
//     // };
//     const { access_token, refresh_token} = refreshToken();
//     return access_token;
// };

// /** You supply a leadSeconds number or function that generates a number of seconds that the refresh should occur prior to the access token expiring */
// const leadSeconds = () => {
//     /** Generate random additional seconds (up to 30 in this case) to append to the lead time to ensure multiple clients dont schedule simultaneous refresh */
//     const jitter = Math.floor(Math.random() * 30);

//     /** Schedule autorefresh to occur 60 to 90 seconds prior to token expiration */
//     return 60 + jitter;
// };
// autorefresh({ refresh, leadSeconds });
export default {
    name: 'login',
    data() {
        const validateUserName = (rule, value, callback) => {
            if (!isUsername(value)) {
                callback(this.$t('validator.username'));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: 'pzpzpz',
                password: '123'
            },
            loginRule: {
                username: [
                    { validator: validateUserName, trigger: 'change', required: true }
                ]
            },
            loading: false
        };
    },
    methods: {
        ...mapActions(['Login']),
        async handLogin() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    this.loading = true;
                    const { username, password } = this.loginForm;
                    const res = await loginByUsername(username, password);
                    this.Login(res.data);
                    this.$router.push({ path: '/' });
                } else {
                    //
                }
            });
        }
    }
};
</script>
<style lang="scss">
@import "src/styles/mixin.scss";
#login-contain {
    @include relative;
    height: 100vh;
    background: #324057;
    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        padding: 35px 35px 15px 35px;
        margin: 160px auto;
    }
    #login-btn {
        width: 100%;
    }
    input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #eeeeee;
        height: 47px;
        outline: none;
        box-shadow: none;
        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
    }
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>
