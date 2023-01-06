import React from "react";

export function Email(props) {
  //console.info(props.data.email.value);
  return (
    <div className="section-margin">
      {!props.loading &&
        props.error &&
        props.data.email.value.email.value.from.emailaddress.name && (
          <div className="error">
            Failed to read your profile. Please try again later. <br /> Details:{" "}
            {props.error.toString()}
          </div>
        )}
      {!props.loading && !props.error && props.data.email.value && (
        <div>
          {props.data.email.value.map((item) => (
            <>
              <div className="row" key={item.id}>
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.subject}</h5>
                      <p className="card-text">{item.bodyPreview}</p>
                      <a
                        href={item.webLink}
                        style={{ textDecoration: "none" }}
                        className="card-link"
                      >
                        open
                      </a>
                    </div>
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
