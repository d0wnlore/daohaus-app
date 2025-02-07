import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import DaoContractSettings from '../components/daoContractSettings';
import DaoMetaOverview from '../components/daoMetaOverview';
import TextBox from '../components/TextBox';
import MainViewLayout from '../components/mainViewLayout';
import { fetchTransmutation, getWrapNZap } from '../utils/theGraph';

const Settings = ({ overview, daoMember, daoMetaData, customTerms }) => {
  const { daochain, daoid } = useParams();
  const [wrapNZap, setWrapNZap] = useState(null);
  const [transmutationContract, setTransmutationContract] = useState(null);

  useEffect(() => {
    const getWNZ = async () => {
      setWrapNZap(await getWrapNZap(daochain, daoid));
      const transmutationRes = await fetchTransmutation({
        chainID: daochain,
        molochAddress: daoid,
      });

      if (transmutationRes.transmutations[0]) {
        setTransmutationContract(
          transmutationRes.transmutations[0].transmutation,
        );
      }
    };
    getWNZ();
  }, [daoid]);

  return (
    <MainViewLayout header='Settings' customTerms={customTerms} isDao>
      <Flex wrap='wrap'>
        <Box
          w={['100%', null, null, null, '50%']}
          pr={[0, null, null, null, 6]}
          pb={6}
        >
          <TextBox size='xs'>Dao Contract Settings</TextBox>
          <DaoContractSettings
            overview={overview}
            customTerms={customTerms}
            wrapNZap={wrapNZap}
            transmutationContract={transmutationContract}
          />
          <Flex justify='space-between' mt={6}>
            <TextBox size='xs'>DAO Metadata</TextBox>
          </Flex>
          <DaoMetaOverview daoMetaData={daoMetaData} daoMember={daoMember} />
        </Box>
      </Flex>
    </MainViewLayout>
  );
};

export default Settings;
