import React, { FC } from "react";

type Props = { alt: string; src: string };

const ProfilePicture: FC<Props> = ({ alt, src }: Props) => (
  <img
    alt={alt}
    src={src}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      minHeight: "100%",
    }}
  />
);

export default ProfilePicture;
