import styled from 'styled-components';

export default styled.div`
    .avatarHolder {
        margin-bottom: 24px;
        text-align: center;
        & > img {
            width: 104px;
            height: 104px;
            margin-bottom: 20px;
        }

        .name {
            margin-bottom: 4px;
            font-family: 'Rubik', normal;
            font-size: 24px;
            line-height: 28px;
            margin-top: 2px;
        }
    }
    .detail {
        p {
            position: relative;
            margin-bottom: 8px;
            padding-left: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        i {
            position: absolute;
            top: 4px;
            left: 0;
            width: 14px;
            height: 14px;
        }
        button {
            margin: 0 5px;
        }
    }
    .title {
        font-family: 'Rubik';
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
    }
`;
