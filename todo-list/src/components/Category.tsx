import React from 'react';
import { categoriesState, categoryState} from '../atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const CategoriesBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 20px 0;
  gap: 5px;
`
const CategoryButton = styled.button`
  border: 0;
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.textColor};
  height: 30px;
  width: 100px;
  overflow: hidden;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
`
const FormBox = styled.div`
  padding-top: 20px;
  
  span{
    margin-top: 20px;
    font-size: 10px;
  }
`

const FormStyle = styled.form`
  border: 2px solid ${props => props.theme.boxColor};
  display: flex;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
`

const FormInput = styled.input`
  font-size: 12px;
  flex: 1;
  border: 0;
  height: 30px;
  outline: none;
  box-shadow: none;
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.bgColor};
  padding-left: 10px;
`

const FormButton = styled.button`
  font-size: 12px;
  border: 0;
  height: 30px;
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.textColor};
`

interface IForm {
  category: string;
}

const Category = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const {register, setValue, handleSubmit, formState} = useForm<IForm>();
  const setCategory = useSetRecoilState(categoryState);
  const handleValid = ({category} : IForm) => {
    setCategories((prev) => [...prev, category]);
    setValue('category', '');
  }

  const onChange = (newCategory: IForm) => {
    setCategory(newCategory as any)
  }

  return (
    <div>
      <FormBox>
        <FormStyle onSubmit={handleSubmit(handleValid)}>
          <FormInput 
            type="text" 
            {...register('category',{
              required: '카테고리를 작성해주세요',
              maxLength: {
                value: 10,
                message: '최대글자는 10자입니다'
              }
            })}
            placeholder='추가할 카테고리 작성'
            />
          <FormButton>add</FormButton>
        </FormStyle>
        <span>{formState?.errors?.category?.message}</span>
      </FormBox>
      <CategoriesBox>
        {
          categories.map(category => <CategoryButton onClick={()=>onChange(category as any)}>{category}</CategoryButton>)
        }
      </CategoriesBox>
    </div>
  );
};

export default Category;