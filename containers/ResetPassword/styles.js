import styled from 'styled-components';

export default styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    
    .main {
        width: 701px;
        padding: 40px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .title {
        font-size: 14px;
        line-height: 17px;
        font-family: 'Rubik', normal;
        margin-top: 6px;
    }
    .signin {
        font-size: 30px;
        line-height: 36px;
        margin-bottom: 65px;
        margin-top: 61px;
        color: #55433c;
        font-family: 'Rubik', normal;
    }
    .text-forgot {
        color: #f8a71b;
        font-family: 'Rubik', normal;
        font-size: 10px;
        line-height: 12px;
        margin-top: 7px;
    }
    .form-login {
        width: 320px;
    }
    .login-form-button {
        margin-top: 50px;
        
        span {
            text-transform: uppercase;
        }
    }
    .social {
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
    }
    .row-remember-fotgot {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    .ant-form label {
        color: #8b8181;
        font-family: 'Rubik', normal;
        font-size: 10px;
        line-height: 12px;
    }
    .text {
        color: #f8a71b;
        font-family: 'Rubik', normal;
    }
    .text-signin {
        color: #8b8181;
        font-family: 'Rubik', normal;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
    }
`;
