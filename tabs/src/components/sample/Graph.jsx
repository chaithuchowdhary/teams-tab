import "./Graph.css";
import { useGraphWithCredential } from "@microsoft/teamsfx-react";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import { Button } from "@fluentui/react-northstar";
import { PersonCardGraphToolkit } from "./PersonCardGraphToolkit";
import { useContext } from "react";
import { TeamsFxContext } from "../Context";
import { JoinedTeams } from "./JoinedTeams";
import { Email } from "./Email";

export function Graph() {
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, error, data, reload } = useGraphWithCredential(
    async (graph, teamsUserCredential, scope) => {
      // Call graph api directly to get user profile information
      const profile = await graph.api("/me").get();
      const joinedTeams = await graph
        .api("me/joinedTeams")
        .select("id,displayName,description")
        .get();
      const email = await graph.api("me/messages").get();

      // Initialize Graph Toolkit TeamsFx provider
      const provider = new TeamsFxProvider(teamsUserCredential, scope);
      Providers.globalProvider = provider;
      Providers.globalProvider.setState(ProviderState.SignedIn);

      let photoUrl = "";
      try {
        const photo = await graph.api("/me/photo/$value").get();

        photoUrl = URL.createObjectURL(photo);
        //console.log("photo url : ", photoUrl);
      } catch {
        // Could not fetch photo from user's profile, return empty string as placeholder.
      }
      return { profile, photoUrl, joinedTeams, email };
    },
    {
      scope: ["User.Read", "Directory.Read.All", "Mail.Read"],
      credential: teamsUserCredential,
    }
  );
  //console.log("data : ", data);

  return (
    <div>
      <div className="section-margin">
        <p>
          Click below to authorize button to grant permission to using Microsoft
          Graph.
        </p>
        <Button
          primary
          content="Authorize"
          disabled={loading}
          onClick={reload}
        />
        <h5>Display user profile using Graph Toolkit</h5>
        <PersonCardGraphToolkit loading={loading} data={data} error={error} />
        <br />
        <h5>Teams joined in MS Teams</h5>
        <JoinedTeams loading={loading} data={data} error={error} />
        <br />
        <h5>E-Mails</h5>
        <Email loading={loading} data={data} error={error} />
      </div>
    </div>
  );
}
