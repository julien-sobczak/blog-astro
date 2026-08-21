export default function GitHubCard({
  name = repository,
  owner,
  repository,
  language,
  creationDate,
  license,
  children,
}) {
  return (
    <div className="GithubCard">
      <h3>
        <span><i className="devicon-github-original"></i> {name} <a href={`https://www.github.com/${owner}/${repository}`}>{`https://www.github.com/${owner}/${repository}`}</a></span>
        <ul>
          <li><span className="manuscript">written in</span> <i class={`devicon-${language.toLowerCase()}-plain`}></i></li>
          {license && <li><span className="manuscript">license</span> {license}</li>}
          {creationDate && <li><span className="manuscript">since</span> {creationDate}–</li>}
        </ul>
      </h3>

      <div>
        {children}
      </div>

    </div>
  );
}