import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { RiAddFill } from 'react-icons/ri';

import ActivitiesFeed from '../components/activitiesFeed';
import { getProposalsActivites } from '../utils/activities';
import ProposalsList from '../components/proposalList';
import MainViewLayout from '../components/mainViewLayout';
import { daoConnectedAndSameChain } from '../utils/general';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { getTerm, getTitle } from '../utils/metadata';
import { useOverlay } from '../contexts/OverlayContext';

const Proposals = React.memo(({ proposals, activities, customTerms }) => {
  const { daochain } = useParams();
  const { address, injectedChain } = useInjectedProvider();
  const { setProposalSelector } = useOverlay();

  const openProposalSelector = () => {
    setProposalSelector(true);
  };

  const ctaButton = daoConnectedAndSameChain(
    address,
    injectedChain?.chainId,
    daochain,
  ) && (
    <Button
      rightIcon={<RiAddFill />}
      title={getTitle(customTerms, 'Proposal')}
      onClick={openProposalSelector}
    >
      New {getTerm(customTerms, 'proposal')}
    </Button>
  );
  return (
    <MainViewLayout
      header='Proposals'
      headerEl={ctaButton}
      customTerms={customTerms}
      isDao
    >
      <Flex wrap='wrap'>
        <Box
          w={['100%', null, null, null, '60%']}
          pr={[0, null, null, null, 6]}
          pb={6}
        >
          <ProposalsList proposals={proposals} customTerms={customTerms} />
        </Box>
        <Box w={['100%', null, null, null, '40%']}>
          <ActivitiesFeed
            limit={5}
            activities={activities}
            hydrateFn={getProposalsActivites}
          />
        </Box>
      </Flex>
    </MainViewLayout>
  );
});

export default Proposals;
