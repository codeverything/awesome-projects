import tensorflow as tf


class MobileNetV3Model(object):
    model = None

    def __init__(self, num_classes):
        self.num_classes = num_classes

    def create_model(self):
        base_model = tf.keras.applications.MobileNetV3Large(input_shape=(224, 224, 3),
                                                            include_top=False,
                                                            weights='imagenet')
        inputs = tf.keras.Input(shape=(224, 224, 3))
        x = self.preprocess_input()(inputs)
        x = base_model(x)
        x = tf.keras.layers.GlobalAveragePooling2D()(x)
        outputs = tf.keras.layers.Dense(self.num_classes, activation="softmax")(x)
        self.model = tf.keras.Model(inputs, outputs)

    def compile(self):
        self.model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
            loss="sparse_categorical_crossentropy",
            metrics=["accuracy"],
        )

    def preprocess_input(self):
        return tf.keras.applications.mobilenet_v3.preprocess_input

    def fit(self, train_dataset, epochs, val_dataset=None):
        if val_dataset:
            history = self.model.fit(
                train_dataset, epochs=epochs, validation_data=val_dataset
            )
        else:
            history = self.model.fit(train_dataset, epochs=epochs)
        return history

    def predict(self, images):
        return self.model.predict(images)

    def evaluate(self, test_dataset):
        return self.model.evaluate(test_dataset)

    def load_model(self, model_path):
        self.create_model()
        self.model.load_weights(model_path)

    def save_model(self, save_path):
        self.model.save_weights(save_path)
