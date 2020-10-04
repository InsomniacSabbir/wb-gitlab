import { getAllIssuesList } from "../../../../utils/api";
import { decodeApiResponse, handleErrors } from "../../../../utils/helper";

// eslint-disable-next-line func-names
export default function () {
  if (options?.repos) {
    const { id } = options.repos;
    const response = getAllIssuesList(id);
    const result = decodeApiResponse(response);

    if (result.status >= 400) {
      handleErrors(result.status, result.response.message);
      return;
    }

    const issues = result.response.map((mr: any) => ({
      name: mr.title,
      html_url: mr.web_url,
      id: mr.iid,
      state: mr.state,
    }));

    return JSON.stringify({
      add: issues,
    });
  }
  return [];
}
