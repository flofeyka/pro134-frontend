import {ReactNode, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCheckAuth} from "@src/hooks/useCheckAuth";

type Props = {
    children: ReactNode
    fallbackUrl: string
};
export const RequiredGuest = (p: Props) => {
    const navigate = useNavigate();
    const [page,setPage] = useState<boolean>(false)

    useCheckAuth()
        .then(auth => auth ? navigate(p.fallbackUrl) : setPage(true))

    return (
        page &&
        <>
            {p.children}
        </>
    );
};