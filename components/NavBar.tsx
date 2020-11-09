import {
    Box,
    Flex,
    Link,
    Text,
    Image,
    Button,
    theme,
    Avatar,
    AvatarBadge,
    List,
    ListItem,
} from "@chakra-ui/core";
import React, { Fragment, useState } from "react";
import Card from "./Card";
import Wrapper from "./Wrapper";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import {
    MeDocument,
    MeQuery,
    PostsDocument,
    RegularUserFragment,
    useLogoutMutation,
    useMeQuery,
} from "~/generated/graphql";

interface NavBarProps {
    me: RegularUserFragment;
}

const NavBar: React.FC<NavBarProps> = ({ me }) => {
    const router = useRouter();
    // const { data, loading } = useMeQuery();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [logout, {}] = useLogoutMutation();
    let AuthSection: JSX.Element | null = null;
    if (!me) {
        AuthSection = (
            <>
                <Button
                    onClick={() => {
                        router.push("/sign-in");
                    }}
                    variant="outline"
                    mr={2}
                >
                    Log In
                </Button>
                <Button
                    onClick={() => {
                        router.push("/sign-in");
                    }}
                    variant="solid"
                    backgroundColor={"blue.500"}
                    color="#fff"
                >
                    Sign Up
                </Button>
            </>
        );
    }

    if (me) {
        AuthSection = (
            <>
                <Link
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                >
                    <Avatar size="sm">
                        <AvatarBadge size="1.25em" bg="green.500" />
                    </Avatar>
                </Link>
                {showMenu && (
                    <Box position="relative">
                        <Box position="absolute" top="50px" right="0">
                            <Card width="100%">
                                <List padding="10px 15px">
                                    <ListItem>
                                        <Link onClick={() => {}}>
                                            Profile
                                        </Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link
                                            onClick={async () => {
                                                await logout({
                                                    refetchQueries: [
                                                        {
                                                            query: PostsDocument,
                                                        },
                                                    ],
                                                    update: (
                                                        cache,
                                                    ) => {
                                                        cache.writeQuery<
                                                            MeQuery
                                                        >({
                                                            query: MeDocument,
                                                            data: {
                                                                __typename:
                                                                    "Query",
                                                                me: null,
                                                            },
                                                        });
                                                    },
                                                });
                                            }}
                                        >
                                            Logout
                                        </Link>
                                    </ListItem>
                                </List>
                            </Card>
                        </Box>
                    </Box>
                )}
            </>
        );
    }

    return (
        <Fragment>
            <Card width="100%">
                <Wrapper>
                    <Flex
                        alignItems="center"
                        padding="20px 0"
                        justifyContent="space-between"
                    >
                        <Box>
                            <NextLink href="/">
                                <Box>
                                    <Link>
                                        <Flex alignItems="center">
                                            <Image
                                                src="/book.png"
                                                alt="BookClub Logo"
                                                size="40px"
                                            />
                                            <Text>BookClub</Text>
                                        </Flex>
                                    </Link>
                                </Box>
                            </NextLink>
                        </Box>
                        <Box>
                            <Flex>{AuthSection}</Flex>
                        </Box>
                    </Flex>
                </Wrapper>
            </Card>
        </Fragment>
    );
};

export default NavBar;
