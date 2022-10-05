package com.example.funapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast

class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Toast.makeText(this,"WELCOME TO FUN APP", Toast.LENGTH_LONG).show()

        var number1 : EditText = findViewById(R.id.InputFirstNumber)
        var number2 : EditText = findViewById(R.id.InputSecondNumber)

        var add : Button = findViewById(R.id.Add)
        var subtract : Button = findViewById(R.id.Subtract)
        var multiply : Button = findViewById(R.id.Multtiply)
        var divide : Button = findViewById(R.id.Divide)
        var answer : TextView = findViewById(R.id.Answer)

        add.setOnClickListener {
            var n1 = number1.text.toString().toDouble()
            var n2 = number2.text.toString().toDouble()
            var answer1 = n1 + n2
            answer.setText(answer1.toString())
        }

        subtract.setOnClickListener {
            var n1 = number1.text.toString().toDouble()
            var n2 = number2.text.toString().toDouble()
            var answer1 = n1 - n2
            answer.setText(answer1.toString())
        }

        multiply.setOnClickListener {
            var n1 = number1.text.toString().toDouble()
            var n2 = number2.text.toString().toDouble()
            var answer1 = n1 * n2
            answer.setText(answer1.toString())
        }

        divide.setOnClickListener {
            var n1 = number1.text.toString().toDouble()
            var n2 = number2.text.toString().toDouble()
            var answer1 = n1 / n2
            answer.setText(answer1.toString())
        }
    }
}



