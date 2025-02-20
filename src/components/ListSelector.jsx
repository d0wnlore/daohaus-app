import React, { useState } from 'react';
import { useBreakpointValue, Flex, IconButton } from '@chakra-ui/react';

import { HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi';
import ContentBox from './ContentBox';
import TextBox from './TextBox';

const ListSelector = props => {
  const viewport = useBreakpointValue({
    base: <DropdownSelector {...props} />,
    md: <StaticSelector {...props} />,
  });

  return <>{viewport}</>;
};

export default ListSelector;

const DropdownSelector = ({ headerSection, topListItem, divider, lists }) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(prevState => !prevState);
  };
  return (
    <Flex
      minW='250px'
      maxW='400px'
      w='100%'
      height='fit-content'
      flexDir='column'
      mr={12}
    >
      {headerSection}
      <ContentBox p='0' border='none' mb={6} w='100%'>
        <Flex flexDir='column'>
          {topListItem}
          {divider && (
            <Flex justifyContent='space-between' alignItems='center'>
              <TextBox ml={6} my={6} size='xs'>
                {divider}
              </TextBox>
              <IconButton
                icon={
                  expanded ? (
                    <HiOutlineChevronRight />
                  ) : (
                    <HiOutlineChevronDown />
                  )
                }
                variant='link'
                isRound='true'
                mr={3}
                p={3}
                height='fit-content'
                onClick={handleToggle}
              />
            </Flex>
          )}
          {expanded && lists}
        </Flex>
      </ContentBox>
    </Flex>
  );
};
const StaticSelector = ({ headerSection, topListItem, divider, lists }) => {
  return (
    <Flex
      minW='250px'
      maxW='400px'
      w='100%'
      height='fit-content'
      flexDir='column'
      mr={12}
    >
      {headerSection}
      <ContentBox p='0' border='none' mb={6} w='100%'>
        <Flex flexDir='column'>
          {topListItem}
          {divider && (
            <TextBox ml={6} my={6} size='xs'>
              {divider}
            </TextBox>
          )}
          {lists}
        </Flex>
      </ContentBox>
    </Flex>
  );
};
