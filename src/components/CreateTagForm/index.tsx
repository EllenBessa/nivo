import * as Dialog from "@radix-ui/react-dialog";
import { Check, Loader2, X } from "lucide-react";

import { Button } from "../ui/button";
import { useCreateTagForm } from "./useCreateTagForm";

export function CreateTagForm() {
  const { createTag, formState, handleSubmit, register, slug } =
    useCreateTagForm();

  return (
    <form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Tag name
        </label>
        <input
          id="title"
          type="text"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-800/20 px-3 py-2.5 text-sm"
          {...register("title")}
        />

        {formState.errors?.title && (
          <p className="text-sm text-red-400">
            {formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="slug" className="block text-sm font-medium">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-800/20 px-3 py-2.5 text-sm"
          readOnly
          value={slug}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button>
            <X className="size-3" />
            Cancel
          </Button>
        </Dialog.Close>

        <Button
          className="bg-teal-400 text-teal-950"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <Check className="size-3" />
          )}
          Save
        </Button>
      </div>
    </form>
  );
}
