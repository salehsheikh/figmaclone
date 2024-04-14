import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";

export function Avatar({ name, otherStyles }: { otherStyles: string; name: string }) {
  return (
    <div className={`${styles.avatar} ${otherStyles} h-9 w-9 rounded-full`} data-tooltip={name} >
      <Image
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
        fill
        className="rounded-full"
        alt={name}
        layout="fill" // Add layout="fill" to fill the parent container
      />
    </div>
  );
}
