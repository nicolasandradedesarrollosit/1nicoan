import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export const projectNumber = (index: number) => String(index + 1).padStart(2, '0');

export async function projectPaths() {
  const projects = await getProjects();
  return projects.map((project, index) => ({
    params: { slug: project.id },
    props: {
      project,
      index,
      previous: projects[index - 1],
      next: projects[index + 1],
    },
  }));
}
