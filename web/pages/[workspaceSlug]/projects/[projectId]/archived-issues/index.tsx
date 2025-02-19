import { ReactElement } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
// layouts
import { AppLayout } from "layouts/app-layout";
// contexts
import { ArchivedIssueLayoutRoot } from "components/issues";
// ui
import { ArchiveIcon } from "@plane/ui";
// components
import { ProjectArchivedIssuesHeader } from "components/headers";
import { PageHead } from "components/core";
// icons
import { X } from "lucide-react";
// types
import { NextPageWithLayout } from "lib/types";
// hooks
import { useProject } from "hooks/store";

const ProjectArchivedIssuesPage: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;
  // store hooks
  const { getProjectById } = useProject();
  // derived values
  const project = projectId ? getProjectById(projectId.toString()) : undefined;
  const pageTitle = project?.name && `${project?.name} - Archived Issues`;

  return (
    <>
      <PageHead title={pageTitle} />
      <div className="flex h-full w-full flex-col">
        <div className="ga-1 flex items-center border-b border-custom-border-200 px-4 py-2.5 shadow-sm">
          <button
            type="button"
            onClick={() => router.push(`/${workspaceSlug}/projects/${projectId}/issues/`)}
            className="flex items-center gap-1.5 rounded-full border border-custom-border-200 px-3 py-1.5 text-xs"
          >
            <ArchiveIcon className="h-4 w-4" />
            <span>Archived Issues</span>
            <X className="h-3 w-3" />
          </button>
        </div>
        <ArchivedIssueLayoutRoot />
      </div>
    </>
  );
});

ProjectArchivedIssuesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout header={<ProjectArchivedIssuesHeader />} withProjectWrapper>
      {page}
    </AppLayout>
  );
};

export default ProjectArchivedIssuesPage;
