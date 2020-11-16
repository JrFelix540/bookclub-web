import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "~/generated/graphql";

export const userIsAuth = () => {
    const { data, loading } = useMeQuery();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !data.me) {
            router.push("/sign-in?next=" + router.pathname);
        }
    }, [loading, data, router]);
};
