import React, { Component } from 'react'
import styled from 'styled-components';
import * as Icon from 'react-feather';

const Container = styled.div`
    position: relative;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 30px;
    article{
        margin-bottom:30px;
        &::last-child{
            margin-bottom:0;
        }
    }
    h2{
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 20px;
        span{
            display: block;
            margin-bottom: 15px;
        }
    }
    article{
        width: 80%;
        margin: 0 auto;
        p{
            word-break: keep-all;
            word-wrap: break-word;
            line-height: 1.45em;
            margin-bottom:10px;
            &:last-child{
                margin-bottom: 0;
            }
        }
    }
`
const Slider = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 600px;
    .carousel__slide {
        display: none;
        text-align: center;
        &--active {
            display: block;
        }
        li{
            line-height: 2em;
        }
    }
`
const Indicator = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    li {
        &:nth-of-type(n + 2) {
            margin-left: 9px;
        }
    }
    .carousel__indicator {
        display: block;
        width: 24px;
        height: 3px;
        background-color: #111;
        cursor: pointer;
        opacity: .15;
        transition: opacity .15s cubic-bezier(.4, 0, 1, 1);
        &:hover {
            opacity: .5;
        }
        &--active {
            &,
            &:hover {
            opacity: .75;
            }
        }
    }
`
const Arrow = styled.a`
    position: absolute;
    top: 50%;
    &.prev{
        left:0;
    }
    &.next{
        right:0;
    }
`

const year = () => {
    const startYear = 2015;
    const date = new Date();
    const year = date.getFullYear();
    return year - startYear;
}
const slideData = [
    {
        title: '안녕하세요',
        desc: [
            `써내려간 코드가 웹에 그려지고, 스크립트가 원하는 대로 잘 구현했을 때의 희열감으로 일하는 ${year()}년차 웹퍼블리셔 박창재입니다. `,
            '어떻게하면 더 효율적으로 작업할 수 있을까 스스로 질문하고 생각하며 작업합니다.',
            '빠르게 변화하는 웹 환경에 맞춰서 꾸준하게 공부 중입니다.',
        ]
    },{
        title: '할 줄 알아요',
        skill: 'html5, css3, sass, javascript, jquery',
    },{
        title: '지금은',
        desc: ['더욱 더 다지기 위해 자바스크립트와 '],
        skill: 'javascript, webpack, react'
    },{
        title: '앞으로는',
        skill: 'typescript, node, vue'
    }
];

class SliderLeftArrow extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <Arrow href="#" className="prev" onClick={onClick}>
          <Icon.ChevronLeft />
      </Arrow>
    );
  }
}
class SliderRightArrow extends Component {
  render() {
    const { onClick } = this.props;
    return (
        <Arrow href="#" className="next" onClick={onClick}>
            <Icon.ChevronRight />
        </Arrow>
    );
  }
}
class SliderIndicator extends Component {
  render() {
    const { index, activeIndex, onClick } = this.props;
    return (
      <li>
        <a
            className={
                index == activeIndex
                ? "carousel__indicator carousel__indicator--active"
                : "carousel__indicator"
            }
            onClick={onClick}
        />
      </li>
    );
  }
}
class Slide extends Component {
  render() {
    const { index, activeIndex, slide } = this.props;
    const skill = () => {
        if( slide.skill !== undefined ){
            let skillList = slide.skill.split(',');
            return(
                <ul>
                    {skillList.map((v,i) => { return <li key={i}><Icon.Check size={14} /> {v}</li> })}
                </ul>
            )
        }
    }
    return (
        <li
            className={
            index === activeIndex
            ? "carousel__slide carousel__slide--active"
            : "carousel__slide"
        }
        >
            <h2> <span>{slide.title}</span> <Icon.GitCommit size={18} /></h2>
            { skill() }
            { slide.desc && <article>{slide.desc.map( (v,i) => {return <p key={i}>{v}</p> })}</article>}
        </li>
    );
  }
}


export default class About extends Component {
    state = {
        activeIndex: 0
    };

    goToSlide(index) {
        this.setState({
            activeIndex: index
        });
    }
    goToPrevSlide(e) {
        e.preventDefault();

        let index = this.state.activeIndex;
        let slidesLength = slideData.length;

        if (index < 1) {
        index = slidesLength;
        }

        --index;

        this.setState({
            activeIndex: index
        });
    }
    goToNextSlide(e) {
        e.preventDefault();

        let index = this.state.activeIndex;
        let slidesLength = slideData.length - 1;

        if (index === slidesLength) {
            index = -1;
        }

        ++index;

        this.setState({
            activeIndex: index
        });
    }

    render() {
        return (
            <Container>
                <SliderLeftArrow onClick={e => this.goToPrevSlide(e)} />
                <Slider>
                    {slideData.map((slide, index) =>
                        <Slide
                            key={index}
                            index={index}
                            activeIndex={this.state.activeIndex}
                            slide={slide}
                        />
                    )}
                </Slider>
                <SliderRightArrow onClick={e => this.goToNextSlide(e)} />

                <Indicator>
                    {slideData.map((slide, index) =>
                        <SliderIndicator
                            key={index}
                            index={index}
                            activeIndex={this.state.activeIndex}
                            isActive={this.state.activeIndex==index} 
                            onClick={e => this.goToSlide(index)}
                        />
                    )}
                </Indicator>
            </Container>
        )
    }
}
