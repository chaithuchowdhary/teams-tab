import React from "react";

export function CurrentUser(props) {
  const { userName } = {
    userName: "",
    ...props,
  };
  return (
    <div>
      {!!userName && (
        <p>
          The currently logged in user's name is <b>{userName}</b>
        </p>
      )}
    </div>
  );
}
