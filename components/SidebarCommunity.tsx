import { Box, Flex, Icon, List, ListItem, Text } from '@chakra-ui/core'
import React, { Fragment } from 'react'
import Card from './Card'

const SidebarCommunity: React.FC = () => {
    return (
        <Fragment>
            <Card width="100%">
                <Box p="20px 15px">
                    <Text>Top BookClubs</Text>
                    <List>
                        <ListItem borderBottom="1px solid #e7e7de" pb="10px">
                            <Flex>
                            <Flex alignItems="center" mr={2}>
                                <Text>1</Text>
                                <Icon name="triangle-up" size="12px" ml={2}/>
                            </Flex>
                            <Box>
                                <Text>
                                    Dystopia
                                </Text>
                            </Box>
                            </Flex>
                            
                        </ListItem>
                        <ListItem borderBottom="1px solid #e7e7de" p="10px 0">
                            <Flex>
                            <Flex alignItems="center" mr={2}>
                                <Text>1</Text>
                                <Icon name="triangle-up" size="12px" ml={2}/>
                            </Flex>
                            <Box>
                                <Text>
                                    Dystopia
                                </Text>
                            </Box>
                            </Flex>
                            
                        </ListItem>
                        <ListItem borderBottom="1px solid #e7e7de" pb="10px">
                            <Flex>
                            <Flex alignItems="center" mr={2}>
                                <Text>1</Text>
                                <Icon name="triangle-up" size="12px" ml={2}/>
                            </Flex>
                            <Box>
                                <Text>
                                    Dystopia
                                </Text>
                            </Box>
                            </Flex>
                            
                        </ListItem>
                        <ListItem borderBottom="1px solid #e7e7de" pb="10px">
                            <Flex>
                            <Flex alignItems="center" mr={2}>
                                <Text>1</Text>
                                <Icon name="triangle-up" size="12px" ml={2}/>
                            </Flex>
                            <Box>
                                <Text>
                                    Dystopia
                                </Text>
                            </Box>
                            </Flex>
                            
                        </ListItem>
                        <ListItem borderBottom="1px solid #e7e7de" pb="10px">
                            <Flex>
                            <Flex alignItems="center" mr={2}>
                                <Text>1</Text>
                                <Icon name="triangle-up" size="12px" ml={2}/>
                            </Flex>
                            <Box>
                                <Text>
                                    Dystopia
                                </Text>
                            </Box>
                            </Flex>
                            
                        </ListItem>
                       
                    </List>
                </Box>
            </Card>
        </Fragment>
    )
}


export default SidebarCommunity