<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->string('transaction_id');
            $table->decimal('amount', 10, 2);
            $table->enum('status',['pending','completed','failed', 'refunded'])->default('completed');
            $table->string('payment_method');
            $table->string('card_last4',4);
            $table->string('card_holder_name',100);
            $table->string('card_expiry',5);
            $table->json('response_data')->nullable();
            $table->unique(['order_id', 'transaction_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
