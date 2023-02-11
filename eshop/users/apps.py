from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self) -> None:
        from users import signals

        # vedem inca odatas cu signal(trebuie sa lucreze)
        # in db trebuie sa avem un usser_id cu un token si sa se stearga
        # logout el sterge tokenurile din db(acces_token==NONE)
        # conectati de repozitoriu

