import React, {useState} from 'react'
import styled from 'styled-components'

import { HiOutlinePlusCircle} from 'react-icons/hi'
const MainContainer = styled.div`
    height : 100%;
    display:flex;
    align-items : center;
    justify-cotent: center;
    flex-direction:column;
    padding : 5%;
`
const InputsContainer = styled.div`
    width : 90vw;
    background-color : white;
    border-radius : 20px;
    border: solid #7B68EE 3px;
    display:flex;
    align-items : center;
    justify-cotent: center;
    flex-direction:column;
    padding : 3%;
    min-height : 70%;
`

const ListBox = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    width: 100%;
`



const InputsBox = styled.div`
    display : block;
    @media screen and (min-width: 700px) {
    display: flex;    
    }
    align-items : center;
    justify-content : space-around;
    width : 85%;
`
const XButton = styled.div`
    text-align : center;
    display : flex;
    align-items : center;
    justify-content: center;
    color : #7B68EE;
    font-size : 1.4rem;
    font-weight : bold;
    &:hover {
        transform: scale(1.03);
    }
    &:active{
        opacity : 80%;
    }
`
    const TextInput = styled.input`
    width : 100%;
    max-width : 70vw;
    display : block;
    font-weight: bold;
    color : black;
    font-size : 1.2rem;
    border : none;
    border-bottom : solid #7B68EE 2px;
    margin : 2%;
    margin-left : 0;
    `

    const SubmitButton = styled.button`
    width : 30%;
    color : white;
    background-color : #7B68EE;
    text-align : center;
    display : flex;
    align-items : center;
    justify-content: center;
    border-radius : 5px;
    padding : 5px;
    font-weight : bold;
    margin-top : 5px;
    &:hover {
        transform: scale(1.03);
    }
    &:active{
        opacity : 80%;
    }
    `
    const ForHover = styled.div`
        &:hover {
            transform: scale(1.1);
        }
        &:active{
            opacity : 80%;
        }
    `

function DoubleInputs({
    firstInput,
    firstPlaceHolder,
    firstInputName,
    secondInput,
    secondPlaceHolder,
    secondInputName,
    id,
    onChangeList,
    list
}){
    return <ListBox>
            <InputsBox>
                <TextInput 
                    placeholder={firstPlaceHolder}
                    value={firstInput}
                    onChange={(e)=>{
                        onChangeList(list.map((item)=>{
                            if(item.id === id){
                                item[firstInputName] = e.target.value.trim();
                            }
                            return item
                        }))
                    }}
                />
                <TextInput 
                    placeholder={secondPlaceHolder}
                    value={secondInput}
                    onChange={(e)=>{
                        onChangeList(list.map((item)=>{
                            if(item.id === id){
                                item[secondInputName] = e.target.value.trim();
                            }
                            return item
                        }))
                    }}
                    
                />
            </InputsBox>
            
            {
                (id == 0) ? <XButton> </XButton>:<XButton
                onClick={()=>{
                    onChangeList(list.filter((item) => item.id !== id))
                }}
            >X</XButton>
            }
        
    </ListBox>
}

function checkInputs(voca){
    switch (""){
        case voca.vocabulary :
            alert("단어를 입력하세요!");
            return false
            break
        case voca.meaningList[0].meaning :
            alert("뜻을 입력하세요!")
            return false
        default :
        return true
    }
}

function saveVoca(voca){
    const loadedList = localStorage.getItem("All");
    if (loadedList !== null){
        const parsedList = JSON.parse(loadedList)
        const addedList = [...parsedList, voca]
        localStorage.setItem("All", JSON.stringify(addedList))
    }else{
        localStorage.setItem("All", JSON.stringify([voca]))
    }
}

export default function AddVoca({
    primaryColor,
    location
}) {
    const editMode  = false;
    const [vocabulary, setVocabulary] = useState("");
    const [meaningList, onChangeMeaningList] = useState(editMode? location.state.workList: [
        {
            meaning : "",
            pos : "",
            id : 0
        },])
    const [exampleSentenceList, onChangeExampleSentenceList] = useState([
        {
            exampleSentence : "",
            meaning : "",
            id : 0
        }
    ])
    const [MeaningListIdNum, onChangeMeaningListIdNum] = useState(editMode? meaningList.length : 1)
    const [ExampleListIdNum, onChangeExampleListIdNum] = useState(editMode? exampleSentenceList.length : 1)

    return (
    <MainContainer>
        <InputsContainer>
        <TextInput 
                placeholder="Vocabulary(어휘)"
                value={vocabulary}
                onChange={(e)=>{setVocabulary(e.target.value)}}
            />

           
            {meaningList.map((item, index)=>{
                            return <DoubleInputs 
                                    firstInput = {item.meaning}
                                    firstPlaceHolder={"Meaning(뜻)"}
                                    firstInputName={"meaning"} 
                                    secondInput={item.pos}
                                    secondPlaceHolder={"Piece Of Speech(품사)"}
                                    secondInputName={"pos"}
                                    key={index}
                                    id={item.id} 
                                    onChangeList={onChangeMeaningList} 
                                    list={meaningList}/>
                    })}
                    <ForHover>
                        <HiOutlinePlusCircle 
                            color="#7B68EE" 
                            size="2rem"
                            onClick={()=>{
                                onChangeMeaningList(
                                [
                                    ...meaningList, {...{meaning : "", pos : ""}, id : MeaningListIdNum}
                                ] 
                                )
                                onChangeMeaningListIdNum(MeaningListIdNum+1)
                            }}
                        />
                    </ForHover>
           
            {exampleSentenceList.map((item, index)=>{
                            return <DoubleInputs 
                                    firstInput = {item.exampleSentence}
                                    firstPlaceHolder={"ExampleSentence(예문)"}
                                    firstInputName={"exampleSentence"} 
                                    secondInput={item.meaning}
                                    secondPlaceHolder={"Meaning(예문 뜻)"}
                                    secondInputName={"meaning"}
                                    key={index}
                                    id={item.id} 
                                    onChangeList={onChangeExampleSentenceList} 
                                    list={exampleSentenceList}/>
                    })}
                <ForHover>
                    <HiOutlinePlusCircle 
                        color="#7B68EE" 
                        size="2rem"
                        onClick={()=>{
                            onChangeExampleSentenceList(
                            [
                                ...exampleSentenceList, {...{exampleSentence : "", meaning : ""}, id : ExampleListIdNum}
                            ] 
                            )
                            onChangeExampleListIdNum(ExampleListIdNum+1)
                        }}                    />   
                </ForHover>
        </InputsContainer>
                <SubmitButton
                onClick={() => {
                    //리스트 안에서 공백리스트 제거하는것 만들기
                    const voca = {
                        date : "",
                        reviewDate : "",
                        vocabulary : vocabulary.trim(),
                        meaningList : meaningList,
                        exampleSentenceList : exampleSentenceList,
                        bookMark : false,
                        IsDone : false,
                        IsSubmittedServer : false,
                        categories : []
                    }
                    if(checkInputs(voca)){
                        saveVoca(voca)
                    }
                   
                    
                }}
                >Submit</SubmitButton>
    </MainContainer>
  )
}
