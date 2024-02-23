import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { tagsServices } from "../../services/tagsServices";

const createTagSchema = z.object({
  title: z.string().min(3, { message: "Minimum 3 characters." })
});

type CreateTagSchema = z.infer<typeof createTagSchema>;

function getSlugFromString(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");
}

export function useCreateTagForm() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, formState } = useForm<CreateTagSchema>(
    {
      resolver: zodResolver(createTagSchema)
    }
  );

  const slug = watch("title") ? getSlugFromString(watch("title")) : "";

  const { mutateAsync } = useMutation({
    mutationFn: tagsServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-tags"]
      });
    }
  });

  async function createTag({ title }: CreateTagSchema) {
    await mutateAsync({ title, slug });
  }
  return {
    register,
    handleSubmit,
    formState,
    createTag,
    slug
  };
}
