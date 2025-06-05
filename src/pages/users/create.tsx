import { Form } from "@/components/theme";
import { useUserForm } from "./use-user-form";
import { useTranslation } from "@/lib/i18n";

export const UsersCreate = () => {
  const { t } = useTranslation();
  const { form, registerFields } = useUserForm({
    action: "create",
  });
  return (
    <Form {...form} title={t("user_profiles.create")}>
      {registerFields}
    </Form>
  );
};
