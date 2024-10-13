import {ReactNode, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCheckAuth} from "@src/hooks/useCheckAuth";

type Props = {
    children: ReactNode,
    fallbackUrl: string
}

export const RequiredAuth = (p: Props) => {
    const navigate = useNavigate();
    const [page,setPage] = useState<boolean>(false)

    useCheckAuth()
        .then(auth => auth ? setPage(auth) : navigate(p.fallbackUrl))

    return (
        page && <>
            {p.children}
        </>
    )
}