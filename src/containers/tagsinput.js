import { useState, useEffect, useRef } from "react";
import { ContainerComponent, Form, Icon, List, Text } from '../components';
import { FaTimes } from 'react-icons/fa';
import { Container } from "react-bootstrap";

export default function TagInput({ itemList = [{
  _id: null,
  name: 'There are no values',
}],
  formField = [],
  setFormField }) {
  const [openInput, setOpenInput] = useState(false);

  const handleClickSection = (e) => {
    e.stopPropagation();
    setOpenInput(true);
  }
  const handleBlur = (e) => {
    e.stopPropagation();
    setOpenInput(false);
  }
  const selectHandler = (e) => {
    e.stopPropagation();
    if (e.key === "Enter" && formField.indexOf(e.target.value) === -1) {
      setFormField(input => {
        return {
          ...input,
          categories: [...formField, e.target.value]
        }
      })
    }
  }
  const deleteOptionHandler = (e, id) => {
    e.stopPropagation();
    setFormField(input => ({
      ...input,
      categories: [...formField.filter((category, index) => index !== id)]
    }));
    setOpenInput(true);
  }

  return (
    <ContainerComponent.Section className="tags_container"
      onClick={handleClickSection}
      onBlur={handleBlur}
      style={{
        width: '100%',
        border: '1px solid #000',
        borderRadius: '25px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>

      {(!formField.length && !openInput) && <Text.Bold
        style={{
          display: 'inline-block'
        }}>
        Select your category
      </Text.Bold>}

      <ContainerComponent.Flex>
        {formField.map((tag, index) => {
          return (
            <ContainerComponent.Item key={index}
              style={{
                width: 'auto',
              }}>
              <Form.Button
                key={index}
                className="tag"
                style={{
                  display: 'inline-block',
                  padding: '5px',
                  background: '#2e3f59',
                  color: 'white',
                  margin: '2px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  whiteSpace: 'nowrap',
                  borderRadius: '20px'
                }}>
                {itemList.find((value) => value._id === tag).name}
                <Text.MiddleLine onClick={(e) => deleteOptionHandler(e, index)}>
                  <Icon>
                    <FaTimes></FaTimes>
                  </Icon>
                </Text.MiddleLine>
              </Form.Button>
            </ContainerComponent.Item>
          );
        })}

        {openInput && <Form.Select id="category"
          placeholder="input your tag"
          onKeyPress={selectHandler}
          name='category'
          style={{
            height: '20px',
            margin: '10px'
          }}
          autoFocus>
          {
            itemList.map(item => <Form.Option
              key={item._id}
              value={item._id}
              label={item.name.toUpperCase()}>
            </Form.Option>
            )
          }
        </Form.Select>}
      </ContainerComponent.Flex>

    </ContainerComponent.Section>
  );
}
