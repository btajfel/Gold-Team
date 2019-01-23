package com.team_gold.chatter;

import android.widget.ArrayAdapter;
import android.content.Context;
import java.util.ArrayList;
import android.view.View;
import android.view.ViewGroup;
import android.view.LayoutInflater;
import android.widget.TextView;

public class ChattAdapter extends ArrayAdapter<Chatt> {
    public ChattAdapter(Context context, ArrayList<Chatt> users) {
        super(context, 0, users);
    }
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Chatt chatt = getItem(position);
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.chatt_item, parent, false);
        }
        TextView usernameTextView = (TextView) convertView.findViewById(R.id.usernameTextView);
        TextView messageTextView = (TextView) convertView.findViewById(R.id.messageEditText);
        TextView timestampTextView = (TextView) convertView.findViewById(R.id.timestampTextView);
        usernameTextView.setText(chatt.username);
        messageTextView.setText(chatt.message);
        timestampTextView.setText(chatt.timestamp);
        return convertView;
    }
}
