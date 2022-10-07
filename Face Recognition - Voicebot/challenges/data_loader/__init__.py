import tensorflow as tf


def load_image_from_directory(path_image_dataset, validation_split=None):
    if not validation_split or validation_split == 0:
        train_ds = tensorflow_load(
            data_dir=path_image_dataset,
        ).prefetch(buffer_size=tf.data.AUTOTUNE)
        return train_ds, None, None

    train_ds = tensorflow_load(
        data_dir=path_image_dataset, validation_split=validation_split, subset="training"
    )
    class_names = train_ds.class_names
    train_ds = train_ds.prefetch(buffer_size=tf.data.AUTOTUNE)

    val_ds = tensorflow_load(
        data_dir=path_image_dataset, validation_split=validation_split, subset="validation"
    ).prefetch(buffer_size=tf.data.AUTOTUNE)

    return train_ds, val_ds, class_names


def tensorflow_load(data_dir, validation_split=None, subset=None):
    if validation_split:
        return tf.keras.preprocessing.image_dataset_from_directory(
            data_dir,
            validation_split=validation_split,
            subset=subset,
            seed=123,
            image_size=(224, 224),
            batch_size=24,
        )
    return tf.keras.preprocessing.image_dataset_from_directory(
        data_dir,
        seed=123,
        image_size=(224, 224),
        batch_size=24,
    )
