import type { Document, DocumentCategoryInfo } from "@/lib/types";

interface DocumentListProps {
  documents: Document[];
  categories: DocumentCategoryInfo[];
}

export default function DocumentList({ documents, categories }: DocumentListProps) {
  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const categoryDocs = documents.filter((d) => d.category === category.id);
        if (categoryDocs.length === 0) return null;

        return (
          <div key={category.id}>
            <h3 className="font-serif text-2xl text-twilight-indigo mb-1">{category.label}</h3>
            <p className="text-sm text-text-secondary mb-5">{category.description}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {categoryDocs.map((doc) => (
                <DocumentItem key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DocumentItem({ doc }: { doc: Document }) {
  const isAvailable = doc.status === "available" && doc.file;

  return (
    <div className="flex items-center gap-4 rounded-md border border-border bg-eggshell p-5 transition-colors hover:border-muted-teal">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-twilight-indigo">
        <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-white fill-none stroke-[1.5]">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-twilight-indigo">{doc.title}</h4>
        <p className={`text-xs mt-0.5 ${isAvailable ? "text-muted-teal font-medium" : "text-text-secondary opacity-70"}`}>
          {isAvailable ? "✓ Disponível" : doc.description}
        </p>
      </div>
      {isAvailable ? (
        <a
          href={doc.file!}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-muted-teal hover:text-twilight-indigo transition-colors"
          aria-label={`Download ${doc.title}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current fill-none stroke-[1.5]">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
      ) : null}
    </div>
  );
}
