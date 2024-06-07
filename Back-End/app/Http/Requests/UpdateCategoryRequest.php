<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'name' => 'nullable|string',
            'description' => 'nullable|string',
            'Category_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'name' => $this->input('name') ?: null,
            'description' => $this->input('description') ?: null,
            'Category_picture' => $this->file('Category_picture') ?: null,
        ]);
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!$this->hasAnyChanges()) {
                $validator->errors()->add('name', 'At least one field must be updated.');
            }
        });
    }

    protected function hasAnyChanges()
    {
        return $this->input('name') || $this->input('description') || $this->file('Category_picture');
    }


}
