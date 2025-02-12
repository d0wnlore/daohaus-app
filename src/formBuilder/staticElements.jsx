import React from 'react';
import {
  Button,
  Box,
  Flex,
  Menu,
  MenuButton,
  Icon,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { RiAddFill, RiErrorWarningLine } from 'react-icons/ri';
// import TextBox from '../components/TextBox';

export const ErrorList = ({ errors = [] }) => {
  //  determine which errors are submit errors

  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      {errors.map((error, index) => (
        <SubmitFormError
          message={error.message}
          key={`${error.message}-${index}`}
        />
      ))}
    </Flex>
  );
};

export const SubmitFormError = ({ message }) => (
  <Flex color='secondary.300' fontSize='m' alignItems='flex-start'>
    <Icon
      as={RiErrorWarningLine}
      color='secondary.300'
      mr={1}
      transform='translateY(2px)'
    />
    {message}
  </Flex>
);

export const ModButton = ({ label, callback }) => (
  <Button onClick={callback} variant='outline' size='xs'>
    {label}
  </Button>
);

export const FormFooter = ({
  options,
  loading,
  addOption,
  errors,
  ctaText,
  secondaryBtn,
}) => {
  if (options?.length) {
    return (
      <Box>
        <Flex alignItems='flex-end' flexDir='column'>
          <Flex mb={2}>
            <AdditionalOptions
              mr='auto'
              options={options}
              addOption={addOption}
            />
            <Button
              type='submit'
              loadingText='Submitting'
              isLoading={loading}
              disabled={loading || errors?.length}
              borderBottomLeftRadius='0'
              borderTopLeftRadius='0'
            >
              {ctaText || 'Submit'}
            </Button>
          </Flex>
          <ErrorList errors={errors} />
        </Flex>
      </Box>
    );
  }
  return (
    <Box>
      <Flex justifyContent='flex-end'>
        <Flex>
          {secondaryBtn && (
            <Button
              type='button'
              variant='outline'
              disabled={loading}
              onClick={secondaryBtn.fn}
              mr={4}
            >
              {secondaryBtn.text}
            </Button>
          )}
          <Button
            type='submit'
            loadingText='Submitting'
            isLoading={loading}
            disabled={loading || errors?.length}
          >
            {ctaText || 'Submit'}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export const AdditionalOptions = ({ options = [], addOption }) => {
  return (
    <Box>
      <Menu color='white' textTransform='uppercase'>
        <MenuButton
          as={Button}
          variant='outline'
          rightIcon={<Icon as={RiAddFill} />}
          borderTopRightRadius='0'
          borderBottomRightRadius='0'
          type='button'
        >
          Additional Options
        </MenuButton>
        <MenuList>
          {options?.map(option => {
            return (
              <MenuItem
                key={option.htmlFor}
                onClick={addOption}
                value={option.htmlFor}
              >
                {option.label}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

// const FormErrorList = formErrorStore => {
//   return formErrorStore.map(error => (
//     <TextBox key='error' variant='body'>
//       {error}
//     </TextBox>
//   ));
// };
