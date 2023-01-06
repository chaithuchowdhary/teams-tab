import React from "react";

export function JoinedTeams(props) {
  return (
    <div className="section-margin">
      {!props.loading && props.error && (
        <div className="error">
          Failed to read your profile. Please try again later. <br /> Details:{" "}
          {props.error.toString()}
        </div>
      )}
      {!props.loading && !props.error && props.data.joinedTeams.value && (
        <div className="row">
          {props.data.joinedTeams.value.map((team) => (
            <>
              <div className="col-sm-6" key={team.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title">{team.displayName}</h6>
                    <p className="card-text">{team.description}</p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
