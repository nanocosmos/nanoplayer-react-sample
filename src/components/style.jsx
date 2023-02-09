import styled from 'styled-components';
import { mobile } from '../responsive';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-right: 10%;
    ${mobile({
        'padding'       : ' 0px',
        'flexDirection' : 'column',
        'marginLeft'    : 1,
        'marginRight'   : 1
    })}
`;

export const Wrapper = styled.div`
    margin-top: 10px;
    ${mobile({
        'padding': 5
    })}
`;

export const Info = styled.div`
    display: flex;
    margin-bottom: 3px;
`;

export const InfoLeft = styled.div``;

export const InfoRight = styled.div`
    display: flex;
`;

export const Logo = styled.img`
    margin-right: auto;
    ${mobile({
        'marginRight': 0
    })}
`;

export const Title = styled.h1`
    font-weight: 600;
    line-height: 1.35;
    letter-spacing: -0.02em;
    font-size: 40px;
    color: #ed7d0e;
    ${mobile({
        'fontSize'  : 20,
        'textAlign' : 'center'
    })}
`;

export const TitleSpan = styled.h3`
    line-height: 1;
    letter-spacing: -0.02em;
    font-weight: 300;
    font-size: 30px;
    text-align: center;
    color: #ed7d0e;
    ${mobile({
        'fontSize': '20px'
    })}
`;

export const VideoWrapper = styled.div`
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
`;

export const WrapVideo = styled.div`
    flex: 1;
`;

export const Video = styled.div`
    margin-bottom: 5px;
    width: 100%;
    aspect-ratio: 16/9;
`;

export const ControlWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: 10px;
    background-color: white;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 10px;
`;

export const ControlLeft = styled.div`
    flex: 1;
    justify-content: left;
`;

export const ControlRight = styled.div`
    margin-right: auto;
`;

export const Button = styled.button`
    color: white;
    font-size: 1em;
    margin-right: ${(props) => props.margin};
    margin-top: 3px;
    padding: 0.2em 0.5em;
    border: 2px solid #ed7d0e;
    background-color: #ed7d0e;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: #ed7d0e;
    }
`;

export const ToggleBotton = styled.button`
    background-color: #feb56b;
    border-radius: 12px;
    border: none;
    color: white;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    margin: 4px 2px;
    cursor: pointer;
`;

export const Input = styled.input`
    accent-color: #ed7d0e;
    border: solid 1px #82cfd0;
    color: #13bba4;
    background: #ed7d0e;
    cursor: pointer;
`;

export const QualityWrapper = styled.div`
    flex: 1;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

export const Stat = styled.div`
    padding: 10px;
    margin-top: ${(props) => props.margin};
`;

export const Quality = styled.div`
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    margin-top: ${(props) => props.margin};
`;

export const StreamItem = styled.ul``;

export const StreamList = styled.li`
    background-color: white;
    color: #ed7d0e;
    padding: 9px 15px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    &:hover {
        background-color: #ed7d0e;
        color: white;
    }
    background-color: ${(prop) => prop.backgroundColor};
    color: ${(prop) => prop.color};
`;

export const CodeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const Code = styled.div`
    flex: 1;
    display: block;
    background: #022336;
    padding: 0px;
    line-height: 1.5em;
    font-family: 'Lucida Console', Monaco, 'Courier New', Courier, monospace;
    border-radius: 5px;
    margin-top: 2px;
    margin-bottom: 10px;
    font-size: 10px;
    color: #72cbff;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap !important;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    overflow: auto;
`;

export const Log = styled.div`
    flex: 1;
    display: block;
    background: #ebebeb;
    padding: 0px;
    line-height: 1.5em;
    font-family: 'Lucida Console', Monaco, 'Courier New', Courier, monospace;
    border-radius: 5px;
    margin-top: 2px;
    margin-bottom: 10px;
    margin-left: 10px;
    font-size: 10px;
    color: #000;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap !important;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    overflow: auto;
    max-height: 820px;
`;

export const Featured = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: ${(props) => props.margin};
`;

export const FeaturedItem = styled.div`
    padding: 5px;
    width: 500px;
    margin-right: 10px;
    max-width: fit-content;
    border-radius: 10px;
    text-align: center;
    color: #ed7d0e;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

export const FeaturedTitle = styled.span`
    font-size: 10px;
    font-weight: 500;
    color: #000;
`;

export const FeaturedName = styled.div`
    font-size: 15px;
    font-weight: 600;
`;

export const Hr = styled.hr`
    border: 1px solid #ebebeb;
    border: ${(prop) => prop.border};
`;

export const SwitchControl = styled.div`
    display: flex;
    padding: 15px;
    margin-top: ${(props) => props.margin};
`;

export const Version = styled.strong`
    font-size: 12px;
    color: #ed7d0e;
`;

export const Statistics = styled.div`
    display: flex;
    margin-top: 5px;
    line-height: 2;
`;

export const StatLeft = styled.p`
    flex: 1;
    font-weight: 600;
    font-size: 12px;
`;

export const StatRight = styled.p`
    flex: 1;
    font-size: 12px;
`;

export const Entries = styled.div`
    display: flex;
`;

export const EntTitle = styled.h2`
    flex: 1;
    font-weight: 600;
    font-size: 16px;
    margin-top: 6px;
    margin-right: 15px;
    color: #ed7d0e;
`;

export const LabelSwitch = styled.label`
    display: flex;
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
`;

export const Slide = styled.div`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    &:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
    }
`;

export const EntRadio = styled.input`
    display: none;
    &:checked + ${Slide} {
        background-color: #ed7d0e;
    }
    &:checked + ${Slide}:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`;

export const EntList = styled.div`
    font-size: 12px;
`;

export const LatencyTitle = styled.label``;

export const LatLabel = styled.h1`
    flex: 1;
    font-weight: 600;
    font-size: 16px;
    margin-right: 15px;
    color: #ed7d0e;
`;

export const LatRadio = styled.input`
    margin-left: 15px;
    width: 20px;
    height: 20px;
    border: 1px solid rgb(250, 249, 249);
    border-radius: 50%;
    outline: none;
    box-shadow: 0 0 5px 0px rgb(241, 240, 240) inset;
    cursor: pointer;
`;
