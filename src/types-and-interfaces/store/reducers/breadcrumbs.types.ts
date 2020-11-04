export type FolderType = {
  id: string;
  parentFolderId: string | null;
  title?: string;
} | null;

export type BreadcrumbsStateType = {
  /**
   * History containing the data of all previous opened folders.
   */
  previousFolders: FolderType[];

  /**
   * Data of the current opened folder.
   */
  currentFolder: FolderType;
};
