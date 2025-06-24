import {readFileSync} from "fs";
import {commentOnPullRequest} from "./src/github-client.js";
import {conductCodeReview} from "./src/openai-client.js";

const config = {
  openApiKey: process.env["OPENAI_API_KEY"],
  githubKey: process.env["GITHUB_TOKEN"],
  repoNameOwner: process.env["GITHUB_REPO_NAME_OWNER"],
  issueNo: parseInt(process.env["ISSUE_NUMBER"] ?? ("0" as string)),
};

async function main() {
  if (!config.openApiKey || !config.githubKey || !config.repoNameOwner) {
    throw new Error(
      "Environment variables OPENAI_API_KEY, GITHUB_TOKEN, and GITHUB_REPO_NAME_OWNER are required but missing. Please set them before running the script."
    );
  }

  const diffContent = readFileSync("./diff.txt", "utf-8");
  try {
    const modelResponse = await conductCodeReview(
      config.openApiKey,
      diffContent
    );
    await commentOnPullRequest({
      githubKey: config.githubKey,
      repoNameOwner: config.repoNameOwner,
      issueNo: config.issueNo,
      body: modelResponse,
    });
  } catch (error) {
    console.error("Failed to execute main:", error);
  }
}

main();
