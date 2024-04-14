"use client";
/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";
import {CheckFollow} from "./profile/user/FollowBtn";


export default function User(user: any|string) {
    
    return (
        <div>
            <img
                src={`https://robohash.org/${user.index}?set=set2&size=180x180`}
                alt={user.name}
                // style={{ height: 180, width: 180 }}
            />
            <h3>{user.user.name}</h3>
            <p>{user.user.email}</p>
            <p>{user.user.id}</p>

            <CheckFollow userId={user.user.id} />
        </div>
    );
}
